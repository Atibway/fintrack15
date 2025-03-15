"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import BudgetCard from "@/components/Budget/BudgetCard";
import CreateBudgetForm from "@/components/Budget/CreateBudgetForm";
import { useQuery } from "@tanstack/react-query";
import { fetchBudgets } from "@/actions/budgets-actions";
import BudgetIndexSkeleton from "./BudgetIndexSkeleton";

const Index = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: async () => fetchBudgets(),
  });

  // Animation variants
  const plusBoxVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const plusButtonHover = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 200 },
  };

  return (
    <div className="min-h-screen m-0 pb-7 flex flex-col">
      {isLoading ? (
        <BudgetIndexSkeleton />
      ) : (
        <>
          {/* Hero and Budgets Section */}
          <motion.section
            className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ margin: 0 }} // Removed margins to make it touch the edges
          >
            {/* Left Section */}
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div
                className="inline-block bg-primary/10 px-4 py-2 text-primary text-sm font-medium rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Budget Bliss
              </motion.div>

              <motion.h1
                className="text-4xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Plan Your Finances with Ease
              </motion.h1>

              <motion.p
                className="text-lg text-muted-foreground max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Create, manage, and track your budgets for financial clarity and success.
              </motion.p>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <Button
                  onClick={() => setShowCreateForm(true)}
                  size="lg"
                  className="font-medium rounded-full"
                >
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Create Budget
                </Button>
              </motion.div>
            </div>

            {/* Right Section - Plus Button with Boxes */}
            <motion.div
              className="relative"
              whileHover={plusButtonHover}
              onClick={() => setShowCreateForm(true)}
            >
              {/* Plus Button */}
              <motion.div
                className="aspect-square bg-gradient-to-tr from-blue-500 to-blue-400 rounded-3xl p-6 flex items-center justify-center shadow-lg cursor-pointer"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <PlusCircle className="w-24 h-24 text-white" />
              </motion.div>

              {/* Floating Top Box */}
              <motion.div
                className="absolute -top-12 -right-12 bg-green-100 dark:bg-green-900/30 glass-card rounded-lg p-4 shadow-md"
                variants={plusBoxVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                <div className="w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </motion.div>

              {/* Floating Bottom Box */}
              <motion.div
                className="absolute -bottom-12 -left-12 bg-blue-100 dark:bg-blue-900/30 glass-card rounded-lg p-4 shadow-md"
                variants={plusBoxVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="w-28 h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
                <div className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Budget Cards Section */}
          <motion.section
            className="w-full mt-12 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {error ? (
              <div className="text-center">
                <p className="text-red-500">Error loading budgets</p>
              </div>
            ) : budgets?.length === 0 ? (
              <div className="text-center">
                <p className="text-lg">No budgets found</p>
                <Button onClick={() => setShowCreateForm(true)} className="mt-4">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  Create Budget
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {budgets?.map((budget) => (
                  <BudgetCard key={budget.id} budget={budget} />
                ))}
              </div>
            )}
          </motion.section>

          {/* Create Budget Form */}
          <CreateBudgetForm isOpen={showCreateForm} onClose={() => setShowCreateForm(false)} />
        </>
      )}
    </div>
  );
};

export default Index;
