const Terms = () => {
  const conditions = [
    'The use of the Website by a tuition teacher or a Student/Parent shall be deemed acceptance of an agreement to these Terms.',
    "The Website has been established to allow Student/Parents to contact tuition teachers and to view their profiles detailing a tuition teacher's experience.",
    'TuitionWala will take all reasonable precautions to keep the details of tuition teachers and Student/Parents secure but will not be liable for unauthorized access to the information provided by tuition teachers and Student/parents.',
    'A tuition teacher warrants that he is of at least eighteen years of age, has the necessary qualifications and/or experience to provide tuition in the subjects specified by TheTuitionTeacher on the Website.',
    'A tuition teacher shall indemnify TuitionWala from all claim liabilities costs and expenses (actual or consequential) of every kind and nature known and unknown, suspected and unsuspected disclosed and undisclosed arising out of any use by TuitionWala of the Website.',
    'A tuition teacher shall accept full responsibility for the prices quoted for his services on the Website and for collection of all fees due to the tuition teacher from any Student/Parent.',
    'A tuition teacher will not include personal email, contact numbers etc in the fields like Tutoring Experience, Tutoring approach, other topics.',
    'In responding to the feedback of Student/parents posted on the Website a tuition teacher shall not be personally abusive about a Student/parent or his nominee.',
    'A tuition teacher accepts full responsibility for all information published by him on the Website and shall indemnify TuitionWala in relation to any liability incurred by them as a result of such information.',
    'A tuition teacher hereby acknowledges that TuitionWala are not liable to the tuition teacher for reimbursement of any fees paid pursuant to these Terms in the events of any cancellation of any Contract or Tuition for any reason.',
    'A tuition teacher acknowledges that he is not an employee of TuitionWala and accepts full responsibility for all Income Tax and other liabilities payable in relation to any fees generated from a tuition contract.',
    'A tuition teacher undertakes to register for TuitionWala service using accurate and current information about himself - including his correct name, address, telephone number, qualifications and any other requested details. A tuition teacher understands details entered by the tuition teacher on the website will be publicly visible and may appear in search engine results.',
    'Student/parent acknowledges that it is his responsibility to verify the credentials and qualifications of any tuition teacher with whom he enters into or proposes to enter into a tuition contract.',
    'While posting tuition requirement at TuitionWala, students/parents should provide as much details as possible for better responses from tutors.',
    'TuitionWala recommend parents/students to ask for a valid ID and address proof of the teacher before hiring them.',
    'The Members acknowledge that TuitionWala may use data for statistical analysis and may provide this to interested third parties.',
    'The Members acknowledge that TuitionWala may monitor postings to the Website and communications through the Website and have the right to delete and/or block such postings or communications.',
    'The Members warrant that their e-mail and other contact addresses are valid and will be and up to date when using the Website.',
    'Members agree not to impersonate any other person or entity or to use a false name or a name that they have no authority to use.',
    'Members acknowledge that TuitionWala are not liable for direct indirect consequential or any other form of loss or damage that may be suffered by a Member through the use of the Website including loss of data or information or any kind of financial or physical loss or damage.',
    'Members acknowledge that TuitionWala give no guarantee that the Website is free of viruses worms or any other form of harmful components.',
    'TuitionWala do not guarantee to secure a tuition teacher for a Student/parent.',
    'Refund & Cancellation Policy. In case of Parent : We will refund the amount of first month tuition fee paid by them after deducting the money for tuition classes already taken.',
    'In case of Tutor: Registration fees is not refundable.',
    "Privacy policy. TuitionWala's Privacy Policy forms part of these Terms and Conditions, and by agreeing to these Terms and Conditions, you also give your consent to the way we may handle your personal data as detailed in that policy. Given the global nature of the World Wide Web, any posting on TuitionWala service (including any which contain personal information) is, of course, accessible to internet users around the world.",
    'Operation of TuitionWala services. TuitionWala reserves the right to withdraw or modify aspects of TuitionWala service, or the entirety of it, where we have legal or commercial reasons to do so. There may also be times when TuitionWala service becomes inaccessible as a result of technical difficulties experienced by TuitionWala or on the Internet; we will, however, use reasonable skill and care to overcome these difficulties where they are within our control.',
    'These Terms will be subject to Indian Law and the jurisdiction of Lucknow Court.',
    'TuitionWala may contact me over voice, Email or SMS for the purpose of informing me about services offered by TuitionWala',
  ];
  return (
    <div className='bg-blue-300 py-6'>
      <div className='grid gap-10 place-content-center w-3/4 mx-auto text-lg bg-white py-4 px-4'>
        <h1 className='text-2xl font-semibold text-center'>
          Terms & Conditions
        </h1>
        <p className='font-semibold text-center'>
          You must take the time to read and understand it before registering
          for TuitionWala service. By registering, you accept that you are
          entering into a contract with us based on these Terms and Conditions.
          Visitors to TuitionWala service who do not register to become a Member
          similarly affirm that they are bound by these Terms and Conditions
          each time they access TuitionWala service.
        </p>
        <ul>
          {conditions.map((term, i) => (
            <li className='list-disc mx-4 my-2'>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Terms;
