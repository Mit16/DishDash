import cron from "node-cron";
import DeliveryGuy from "../models/deliveryModel.js"; // Adjust the path to your delivery model

// Daily reset
cron.schedule("0 0 * * *", async () => {
  console.log("Running daily earnings reset...");
  try {
    const allDeliveryGuys = await DeliveryGuy.find();
    for (const guy of allDeliveryGuys) {
      // Archive daily earnings
      guy.earningsHistory.push({
        date: new Date(),
        dailyTotal: guy.dailyEarnings,
      });

      // Reset daily earnings and add to weekly earnings
      guy.weeklyEarnings += guy.dailyEarnings;
      guy.dailyEarnings = 0;

      await guy.save();
    }
    console.log("Daily earnings reset successfully.");
  } catch (error) {
    console.error("Error in daily cron job:", error);
  }
});

// Weekly reset (Sunday at midnight)
cron.schedule("0 0 * * 0", async () => {
  console.log("Running weekly earnings reset...");
  try {
    const allDeliveryGuys = await DeliveryGuy.find();
    for (const guy of allDeliveryGuys) {
      const lastWeekTotal = guy.weeklyEarnings;

      // Archive weekly earnings
      guy.earningsHistory.push({
        date: new Date(),
        weeklyTotal: lastWeekTotal,
      });

      // Reset weekly earnings and add to monthly earnings
      guy.monthlyEarnings += lastWeekTotal;
      guy.weeklyEarnings = 0;

      await guy.save();
    }
    console.log("Weekly earnings reset successfully.");
  } catch (error) {
    console.error("Error in weekly cron job:", error);
  }
});

// Monthly reset (First day of the month at midnight)
cron.schedule("0 0 1 * *", async () => {
  console.log("Running monthly earnings reset...");
  try {
    const allDeliveryGuys = await DeliveryGuy.find();
    for (const guy of allDeliveryGuys) {
      const lastMonthTotal = guy.monthlyEarnings;

      // Archive monthly earnings
      guy.earningsHistory.push({
        date: new Date(),
        monthlyTotal: lastMonthTotal,
      });

      // Reset monthly earnings and add to total earnings
      guy.totalEarnings += lastMonthTotal;
      guy.monthlyEarnings = 0;

      await guy.save();
    }
    console.log("Monthly earnings reset successfully.");
  } catch (error) {
    console.error("Error in monthly cron job:", error);
  }
});
