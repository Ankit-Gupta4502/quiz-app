import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { handleChange, handleSubmit, quiz, error } = useGlobalContext();
  return (
    <section className="quiz quiz-small">
      <form className="setup-form" onSubmit={handleSubmit}>
        {/* amount */}
        <div className="form-control">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            value={quiz.amount}
            onChange={handleChange}
            className="form-input"
            min={1}
            max={50}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            className="form-input"
            value={quiz.category}
            onChange={handleChange}
          >
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="history">History</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">difficulty</label>
          <select
            name="difficulty"
            className="form-input"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        {error && <p className='error'>can't genrate questions please try different options</p>}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
