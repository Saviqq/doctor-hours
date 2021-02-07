# Dr. Albert Crentist's office hours

This project was created as front-end assigment for InfoBip company

## Decissions

In the project few decissions had to be made based on assigment

### Technologies

I have chosen React library with TypeScript integration for implementation. It's the
technology for which I am being evaluated (as javaScript FE dev) and I've added
TypeScript to improve my development experience.

### Styling

I have decided not to use any styling/component library and style components in 'vanilla' fashion. The reason was to atleast
somehow show my CSS skills and also there was no need for complex styling libraries for such a small project

### Date managment

While I have decided to not complicate my app with styling/components lib I made decission to use very handy lib for
handling and manipulating dates. I wanted to relly on robust, safe and tested library as Date operations are
core of the whole assigment. Other option would be to create some own utils functions for it, but that would
increase time required for the assigment and also I didn't want to re-invent the wheel :)

### Data fetching

One of the decissions was how to fetch data for the app. I was considering creating some simple BE nodejs app for it, but
from the assigment and time constraints I have realized it's better not to over-engineer it and so I have decided to mock
BE with data generation and storing it using React Context

## Additional Improvements

There are few improvements to the app that I can think of

### Translations

Currently I have texts right in components as applicatio is small and it's not so messy, in future it should be
replaced with some translation library i.e https://react.i18next.com/

### Tests

Some simple tests to showcase skills with testing React apps

### Styling and color scheme

More time playing with styling and trying different colour schemes could improve looks and UX of the app.

### Mobile friendly

I have decided to omit responsivity of the calendar as I don't think it was part of the assigment and due time constrains ,
but it would be nice to showcase skills with responsivness
