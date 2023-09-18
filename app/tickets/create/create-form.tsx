"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title,
      body,
      priority,
      user_email: "ryo@gmail.com",
    };

    const response = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (response.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <form action="" className="w-1/2" onSubmit={handleSubmit}>
      <label>
        <span>Title:</span>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button
        className="btn-primary"
        disabled={isLoading}
        onSubmit={handleSubmit}
      >
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
};

export default CreateForm;
