import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import TestProvider, { mockStore } from "../../../test/TestProvider";
import FilterDrawer from "./FilterDrawer";
import { filterList } from "../../../redux/actions";
import { FILTERS } from "../../../lib/constants";

jest.mock("../../../redux/actions", () => ({
  filterList: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn((callback) => callback(mockStore)),
}));

describe("FilterDrawer", () => {
  let container;
  const Wrapper = () => (
    <TestProvider>
      <FilterDrawer />
    </TestProvider>
  );

  beforeEach(() => {
    container = mount(<Wrapper />);
  });

  afterEach(() => {
    container.unmount();
  });

  it("mounts", () => {
    expect(container.find("FilterDrawer").exists()).toBe(true);
  });

  it("toggles the drawer", () => {
    expect(container.find("WithStyles(ForwardRef(Drawer))").props().open).toBe(
      false
    );
    act(() => {
      container.find("ForwardRef(IconButton)").simulate("click");
    });
    container.update();
    expect(container.find("WithStyles(ForwardRef(Drawer))").props().open).toBe(
      true
    );
  });

  it("correctly calls dispatch to filter transactions", () => {
    const { filters, order, orderBy, searchPhrase } = mockStore.data;
    act(() => {
      container.find("ForwardRef(IconButton)").props().onClick();
    });
    container.update();
    container
      .find("ForwardRef(Select)")
      .first()
      .props()
      .onChange({
        target: { value: "test option" },
      });
    expect(filterList).toHaveBeenCalledWith(
      { [FILTERS[0].id]: "test option" },
      { filters, order, orderBy, searchPhrase }
    );
  });
});
