<template>
  <div class="container mx-auto h-min-100">
    <div class="w-full bg-green-100 p-6 rounded-md text-center">
      <h1 class="text-3xl font-bold">Calculator</h1>
      <p class="text-gray-700 mt-4">
        This is the Calculator page where we describe our application.
      </p>
      <!-- Add a Button for Contact -->
      <div class="mt-6">
        <NuxtLink to="/calculator" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to EMICalculator
        </NuxtLink>
      </div>
    </div>
    <form @submit.prevent="calculateEmi" class="bg-cyan-50 shadow-md rounded px-8 pt-6 pb-8 mb-6">
      <div class="mb-4">
        <label for="principal" class="block text-sm font-medium text-gray-700">Loan Amount:</label>
        <input
            type="number"
            id="principal"
            v-model="principal"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>
      <div class="mb-4">
        <label for="interest" class="block text-sm font-medium text-gray-700">Annual Interest Rate (%):</label>
        <input
            type="number"
            id="interest"
            v-model="annualInterestRate"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>
      <div class="mb-4">
        <label for="tenure" class="block text-sm font-medium text-gray-700">Total Tenure (months):</label>
        <input
            type="number"
            id="tenure"
            v-model="totalTenureMonths"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>
      <div class="mb-4">
        <label for="gracePeriod" class="block text-sm font-medium text-gray-700">Grace Period (months):</label>
        <input
            type="number"
            id="gracePeriod"
            v-model="gracePeriodMonths"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>
      <div class="mb-4">
        <label for="disbursementDate" class="block text-sm font-medium text-gray-700">Disbursement Date:</label>
        <input
            type="date"
            id="disbursementDate"
            v-model="disbursementDate"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
      </div>
      <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Calculate EMI
      </button>
    </form>

    <div v-if="results.length" class="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 class="text-xl font-bold mb-4">Payment Schedule</h2>
      <table class="min-w-full border border-gray-300">
        <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2">Month</th>
          <th class="border border-gray-300 px-4 py-2">Principal</th>
          <th class="border border-gray-300 px-4 py-2">Interest</th>
          <th class="border border-gray-300 px-4 py-2">Total</th>
          <th class="border border-gray-300 px-4 py-2">Disbursement Date</th>
          <th class="border border-gray-300 px-4 py-2">Payment Date</th>
          <th class="border border-gray-300 px-4 py-2">Payable Amount</th>
          <th class="border border-gray-300 px-4 py-2">Remaining Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in results" :key="index" class="hover:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.month }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.principal.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.interest.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.total.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.disbursement_date }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.payment_date }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.payable.toFixed(2) }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">{{ item.remaining.toFixed(2) }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      principal: 1000000, // Default value
      annualInterestRate: 6, // Default value
      totalTenureMonths: 36, // Default value
      gracePeriodMonths: 6, // Default value
      disbursementDate: '', // Default value
      results: [],
    };
  },
  methods: {
    calculateEmi() {
      const monthlyInterestRate = this.annualInterestRate / 100 / 12;
      let principal = this.principal;
      const totalTenureMonths = this.totalTenureMonths;
      const gracePeriodMonths = this.gracePeriodMonths;
      const results = [];

      // Interest payments during grace period
      for (let month = 1; month <= gracePeriodMonths; month++) {
        const interestPayment = principal * monthlyInterestRate;
        results.push({
          principal: 0,
          interest: parseFloat(interestPayment.toFixed(2)),
          total: parseFloat(interestPayment.toFixed(2)),
          month: `Month-${month}`,
          disbursement_date: this.disbursementDate,
          payment_date: this.addMonthsNoOverflow(this.disbursementDate, month),
          payable: parseFloat(interestPayment.toFixed(2)),
          remaining: principal,
        });
      }

      // Remaining tenure after grace period
      const remainingTenure = totalTenureMonths - gracePeriodMonths;

      // Calculate EMI
      const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, remainingTenure)) /
          (Math.pow(1 + monthlyInterestRate, remainingTenure) - 1);

      // Calculate principal and interest for each month after the grace period
      for (let month = 1; month <= remainingTenure; month++) {
        const interestPayment = principal * monthlyInterestRate;
        const principalPayment = emi - interestPayment;

        results.push({
          principal: parseFloat(principalPayment.toFixed(2)),
          interest: parseFloat(interestPayment.toFixed(2)),
          total: parseFloat(emi.toFixed(2)),
          month: `Month-${month + gracePeriodMonths}`,
          disbursement_date: this.disbursementDate,
          payment_date: this.addMonthsNoOverflow(this.disbursementDate, month + gracePeriodMonths),
          payable: parseFloat(emi.toFixed(2)),
          remaining: parseFloat((principal - principalPayment).toFixed(2)),
        });

        // Reduce principal balance
        principal -= principalPayment;
      }

      this.results = results;
    },
    addMonthsNoOverflow(dateString, months) {
      const date = new Date(dateString);
      date.setMonth(date.getMonth() + months);

      // Check for overflow in February
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      if (date.getDate() > lastDayOfMonth) {
        date.setDate(lastDayOfMonth); // Set to the last valid day of the month
      }

      return date.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
    },
  },
};
</script>

<style scoped>
/* Add additional styles here if needed */
</style>
