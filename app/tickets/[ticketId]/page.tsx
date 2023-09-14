import React from "react";
import { notFound } from "next/navigation";
import { Ticket } from "@/types/ticket";

/* *
 * dynamicParams enables us to get params
 * if it's false then params will be memoized
 */
export const dynamicParams = false;

type Props = {
  params: {
    ticketId: string;
  };
};

export const generateStaticParams = async () => {
  const response = await fetch("http://localhost:4000/tickets");

  const tickets: Ticket[] = await response.json();

  return tickets.map((ticket) => ({
    ticketId: ticket.id,
  }));
};

async function getTicket(id: string): Promise<Ticket> {
  await new Promise(resolve => setTimeout(resolve, 3000))
  const response = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 600,
    },
  });

  if (!response.ok) {
    notFound();
  }
  return response.json();
}

const TicketDetails = async ({ params }: Props) => {
  const ticket = await getTicket(params.ticketId);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
};

export default TicketDetails;
