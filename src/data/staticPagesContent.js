export const STATIC_PAGES = {
  about: {
    title: 'About us',
    intro: 'SwiftCart is a demo storefront built to explore modern e-commerce UX patterns.',
    sections: [
      {
        heading: 'Our story',
        body: 'SwiftCart started as a learning project — a place to bring together product discovery, cart flows, and checkout in one cohesive experience.',
      },
      {
        heading: 'What we sell',
        body: 'All products shown are sample data from DummyJSON, used for demonstration purposes only. No real purchases are processed.',
      },
    ],
  },
  careers: {
    title: 'Careers',
    intro: "We're not currently hiring — this is a demo project, not a real company.",
    sections: [
      {
        heading: 'Interested in building something like this?',
        body: 'This project showcases React, Context API, and modern e-commerce patterns. Feel free to explore the code.',
      },
    ],
  },
  press: {
    title: 'Press',
    intro: 'Media inquiries for this demo project can be directed to the contact page.',
    sections: [],
  },
  sustainability: {
    title: 'Sustainability',
    intro: 'As a demo project, SwiftCart does not have real supply chain or sustainability initiatives.',
    sections: [
      {
        heading: 'Why this section exists',
        body: 'This page demonstrates how a sustainability or values-driven section might be structured within an e-commerce footer.',
      },
    ],
  },
  help: {
    title: 'Help center',
    intro: 'Common questions about shopping on SwiftCart.',
    sections: [
      { heading: 'How do I track my order?', body: 'Visit the Track order page and enter your order number.' },
      { heading: 'What payment methods are accepted?', body: 'This demo store does not process real payments.' },
      { heading: 'How do returns work?', body: 'See our Shipping & returns page for details.' },
    ],
  },
  'track-order': {
    title: 'Track order',
    intro: 'Order tracking is not connected to a real shipping provider in this demo.',
    sections: [
      {
        heading: 'Where to find your order number',
        body: 'After checkout, your order confirmation page displays a unique order number starting with "SC-".',
      },
    ],
  },
  'shipping-returns': {
    title: 'Shipping & returns',
    intro: 'Our shipping and return policy, in brief.',
    sections: [
      { heading: 'Shipping', body: 'Orders over $50 ship free. Orders under $50 include a flat $5.99 shipping fee.' },
      { heading: 'Returns', body: 'Items can be returned within 30 days of delivery in original condition.' },
    ],
  },
  contact: {
    title: 'Contact us',
    intro: 'Reach out with any questions.',
    sections: [
      { heading: 'Email', body: 'support@swiftcart.com' },
      { heading: 'Phone', body: '+20 1024149146' },
    ],
  },
  privacy: {
    title: 'Privacy policy',
    intro: 'This is a demo project. No real personal data is collected, stored, or shared with third parties.',
    sections: [],
  },
  terms: {
    title: 'Terms of service',
    intro: 'By using this demo store, you acknowledge it is for demonstration purposes only.',
    sections: [],
  },
  cookies: {
    title: 'Cookie settings',
    intro: 'This demo uses localStorage for cart, wishlist, and theme preferences — no third-party tracking cookies are used.',
    sections: [],
  },
};