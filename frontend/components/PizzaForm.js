import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, update } from "../state/formSlice";
import { useCreateOrderMutation } from "../state/pizzaApi";

const initialFormState = {
  // suggested
  fullName: "",
  size: "",
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
};

export default function PizzaForm() {
  const formState = useSelector((state) => state.form);
  const [submitOrder, {error, isLoading}] = useCreateOrderMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      dispatch(update({ name, value: checked }));
    } else {
      dispatch(update({ name, value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toppings = [];
    if (formState['1']) toppings.push('1');
    if (formState['2']) toppings.push('2');
    if (formState['3']) toppings.push('3');
    if (formState['4']) toppings.push('4');
    if (formState['5']) toppings.push('5');
    const data = {fullName: formState.fullName, size: formState.size, toppings};
    submitOrder(data);
    dispatch(reset());
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className="pending">Order in progress...</div>}
      {error && (
        <div className="failure">Order failed: {error.data.message}</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            onChange={handleChange}
            value={formState.fullName}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            onChange={handleChange}
            value={formState.size}
            data-testid="sizeSelect"
            id="size"
            name="size"
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            onChange={handleChange}
            checked={formState["1"]}
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            onChange={handleChange}
            checked={formState["2"]}
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            onChange={handleChange}
            checked={formState["3"]}
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            onChange={handleChange}
            checked={formState["4"]}
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            onChange={handleChange}
            checked={formState["5"]}
            data-testid="checkHam"
            name="5"
            type="checkbox"
          />
          Ham
          <br />
        </label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  );
}
