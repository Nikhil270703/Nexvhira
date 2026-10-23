import type { Faq, Step } from './types';

/** How a project runs, in order. */
export const steps: Step[] = [
  {
    title: 'Tell us how you work',
    body: 'A call or a meeting in Pune. We look at the registers, sheets and apps you use today and what slows you down.',
  },
  {
    title: 'Get a written quote',
    body: 'You get the scope, the price and the timeline in writing before any work starts.',
  },
  {
    title: 'See it take shape',
    body: 'We build in short rounds and show you working screens as we go, so changes happen early.',
  },
  {
    title: 'Launch and support',
    body: 'We put it online, walk your staff through it and stay on call for fixes after launch.',
  },
];

export const faqs: Faq[] = [
  {
    q: 'How much does custom software cost?',
    a: 'It depends on what the software has to do. Tell us the features you need and we will send a written quote before any work starts.',
  },
  {
    q: 'Can my staff use it in Marathi?',
    a: 'Yes. Our pharmacy and flour mill apps already switch between English and मराठी, and we can build the same into yours.',
  },
  {
    q: 'Will it work on phones?',
    a: 'Yes. Everything we build works in a phone’s browser, and can be added to the home screen like an app.',
  },
  {
    q: 'Can I see a demo first?',
    a: 'The live products on this site have links you can open. For prototypes, message us and we will set up a demo.',
  },
  {
    q: 'Where are you based?',
    a: 'Pune, Maharashtra. We work with clients over WhatsApp and calls, and can meet in person around Pune.',
  },
];
