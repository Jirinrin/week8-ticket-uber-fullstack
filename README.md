# Ticket Uber app

This application was the final assignment during the Codaisseur Codaisseur Academy, where we had 4 days to 'put all our aquired skills together' for a final evaluation.  
(See FinalAssignment.md for the formal requirements of the assignment / basically a detailed description of how the application works.)

It is a simple application where people can (re)sell tickets to events, and when you buy a ticket an Uber will be dispatched to your house (I know it's a bit weird and ambiguous, but it made for a good assignment).  
It's composed of a React.js client and a Node.js+Koa+RoutingControllers+TypeORM+Postgres server-database-combo, and uses a few extra npm packages here and there.

I removed most of my other projects from the Codaisseur Code Academy, because I believe this one will give a comprehensive overview of me putting all the skills I learned there together.  
So go ahead and use it as a sample for that!

## Features

It has the following features:
- Login / logout / signup as admin / normal user, including bcrypt auth stuff and validation etc.;
- Events list
  * Admins can create/edit/delete an event (including date interval);
  * Events that are already finished are not shown and the events are paginated by 9 per page;
  * It is possible to filter by the date range that you want to look in;
  * You can also search within all the fields of every event with a live-updating search field;
- Event description + Tickets list on event
  * Users can create a ticket for an event, with a price and stuff;
  * Users can edit/delete their own ticket or admins can also do it;
  * All the tickets are marked with a 'risk of being a fraud' (and also color-coded based on that) based on an admittedly pretty arbitrary algorithm which was being put as being 'super important' in the assignment;
  * It is possible to sort tickets (ascending/descending order) by date, author and price
- Ticket description + Comments list on ticket
  * Users can put comments on tickets;
  * Admins can delete comments;

### Aside

As you can see, it looks like crap. This is because I chose to sacrifice aeshetics to spend my time on creating functionality, which I still think was a good decision. Maybe I'll add some styling eventually.

Oh, and yes, the 'Uber' feature from the title was actually completed by no one in the course, as integrating the app with the Uber API was the very last bonus item on the assignment page...  
That's not gonna stop me from keeping it in the title tho~!

## Demo

![gif-2](/readme-images/ticket-uber-2.gif)  
![gif-3](/readme-images/ticket-uber-3.gif)  
![gif-4](/readme-images/ticket-uber-4.gif)