import { render, screen, fireEvent } from "@testing-library/react";
import NewTask from "../components/NewTask/NewTask";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";

test("add new task", async () => {
  render(
    <Provider store={store}>
      <NewTask />
    </Provider>
  );

  const input = screen.getByTestId("newTask.input");
  const button = screen.getByTestId("newTask.addButton");

  fireEvent.change(input, { target: { value: "New task" } });
  fireEvent.click(button);

  expect(screen.getByText("New todo")).toBeInTheDocument;
});

test("add new task with existing name", async () => {
  render(
    <Provider store={store}>
      <NewTask />
    </Provider>
  );

  const input = screen.getByTestId("newTask.input");
  const button = screen.getByTestId("newTask.addButton");

  fireEvent.change(input, { target: { value: "New task" } });
  fireEvent.click(button);

  await new Promise((r) => setTimeout(r, 2000));

  fireEvent.change(input, { target: { value: "New task" } });
  fireEvent.click(button);

  expect(screen.getByTestId("newTask.errorMessage")).toBeInTheDocument;
});

test("add new task with empty name", async () => {
  render(
    <Provider store={store}>
      <NewTask />
    </Provider>
  );

  const input = screen.getByTestId("newTask.input");
  const button = screen.getByTestId("newTask.addButton");

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(button);

  expect(screen.getByTestId("newTask.errorMessage")).toBeInTheDocument;
});
