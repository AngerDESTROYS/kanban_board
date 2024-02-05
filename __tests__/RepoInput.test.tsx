import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../src/redux/reducers";
import fetchMock from "jest-fetch-mock";
import KanbanBoard from "../src/components/KanbanBoard";

fetchMock.disableMocks();

const store = configureStore({ reducer: rootReducer });

test("renders repository details after loading", async () => {
  render(
    <Provider store={store}>
      <KanbanBoard />
    </Provider>
  );

  const inputElement = screen.getByPlaceholderText("Enter GitHub repo URL");
  const loadButton = screen.getByText("Load");

  fireEvent.change(inputElement, {
    target: { value: "https://github.com/facebook/react" },
  });
  fireEvent.click(loadButton);

  await waitFor(() => {
    const ownerProfileLink = screen.getByText("View Owner's Profile: facebook");
    expect(ownerProfileLink).toBeInTheDocument();
  });
  await waitFor(() => {
    const repositoryLink = screen.getByText("View Repository: react");
    expect(repositoryLink).toBeInTheDocument();
  });
  await waitFor(() => {
    const starCount = screen.getByText(/[\d,]+ K stars/);
    expect(starCount).toBeInTheDocument();
  });
});
