import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskCategory from "../components/TaskCard/TaskCategory";
import { Category } from "../types";

test("check normal category", async () => {
  const category = Category.Normal;
  render(<TaskCategory category={category} />);

  const categoryChip = screen.getByText("Normal");

  expect(categoryChip).toBeVisible();
});

test("check urgent category", async () => {
  const category = Category.Urgent;
  render(<TaskCategory category={category} />);

  const categoryChip = screen.getByText("Urgent");

  expect(categoryChip).toBeVisible();
});

test("check undefined category", async () => {
  const category = "Category.Normal" as unknown as Category;
  render(<TaskCategory category={category} />);

  const categoryChip = screen.getByText("Unknown");

  expect(categoryChip).toBeVisible();
});
