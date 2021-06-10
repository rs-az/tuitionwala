const privacy = () => {
  const policies = [
    {
      heading: 'Personal identification information',
      sub: [
        'We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.',
      ],
    },
    {
      heading: 'Non-personal identification information',
      sub: [
        'We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.',
      ],
    },
    {
      heading: 'Web browser cookies',
      sub: [
        "Our Site may use 'cookies' to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.",
      ],
    },
    {
      heading: 'How we use collected information',
      sub: [
        'TuitionWala collects and uses Users personal information for the following purposes:',
        '- To personalize user experience',
        'We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.',
        '- To improve our Site',
        'We continually strive to improve our website offerings based on the information and feedback we receive from you.',
        '- To improve customer service',
        'Your information helps us to more effectively respond to your customer service requests and support needs.',
        '- To process transactions',
        'We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.',
        '- To administer a content, promotion, survey or other Site feature',
        'To send Users information they agreed to receive about topics we think will be of interest to them.',
        '- To send periodic emails',
        'The email address Users provide for order processing, will only be used to send them information and updates pertaining to their order. It may also be used to respond to their inquiries, and/or other requests or questions. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email or User may contact us via our Site.',
      ],
    },
    {
      heading: 'How we protect your information',
      sub: [
        'We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.',
      ],
    },
    {
      heading: 'Third party websites',
      sub: [
        "Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website's own terms and policies.",
      ],
    },
    {
      heading: 'Advertising',
      sub: [
        'Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non personal identification information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This privacy policy does not cover the use of cookies by any advertisers.',
      ],
    },
    {
      heading: 'Google Adsense',
      sub: [
        "Some of the ads may be served by Google. Google's use of the DART cookie enables it to serve ads to Users based on their visit to our Site and other sites on the Internet. DART uses 'non personally identifiable information' and does NOT track personal information about you, such as your name, email address, physical address, etc. You may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at http://www.google.com/privacy_ads.html",
      ],
    },
    {
      heading: 'Changes to this privacy policy',
      sub: [
        'TuitionWala has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.',
      ],
    },
    {
      heading: 'Your acceptance of these terms',
      sub: [
        'By using this Site, you signify your acceptance of this policy and also authorize TuitionWala to call, Email or SMS you. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.',
      ],
    },
  ];
  return (
    <div className='bg-blue-300 py-6 w-full '>
      <div className='flex flex-col space-y-10 justify-center w-full lg:w-3/4 lg:mx-auto text-lg bg-white py-4 px-4'>
        <h1 className='text-2xl font-semibold text-center'>Privacy-Policy</h1>
        <p className='font-semibold text-center'>
          This Privacy Policy governs the manner in which TuitionWala collects,
          uses, maintains and discloses information collected from users (each,
          a "User") of TuitionWala website ("Site"). This privacy policy applies
          to the Site and all products and services offered by TuitionWala.
        </p>
        {policies.map((element, i) => [
          <h2 className='font-semibold' key={i}>
            {element.heading}
          </h2>,
          element.sub.map((e, index) => <p key={index}>{e}</p>),
        ])}
      </div>
    </div>
  );
};

export default privacy;
