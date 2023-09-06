'use client';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import '@/styles/app/unauth/terms-conditions.scss';
import { useState } from 'react';

export default function TermsConditions() {
  // const [step, setStep]=useState(0);
  const titles = [
    'Intellectual Property Rights',
    'Privacy Policy',
    'Ownership of Materials',
    'User Representations',
    'Copyright Policy',
  ];
  const steps = [
    {
      label: 'Intellectual Property Rights',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Diam quam nulla porttitor massa. Porttitor massa id neque aliquam vestibulum morbi blandit. Risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam quis. Non consectetur a erat nam. Iaculis urna id volutpat lacus. Turpis nunc eget lorem dolor sed. Pharetra massa massa ultricies mi quis hendrerit dolor. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Adipiscing at in tellus integer feugiat.',
    },
    {
      label: 'Privacy Policy',
      description:
        'Sed arcu non odio euismod lacinia at quis risus sed. Semper eget duis at tellus at urna condimentum. Ultrices mi tempus imperdiet nulla. Vel fringilla est ullamcorper eget nulla facilisi etiam. Malesuada bibendum arcu vitae elementum. In hac habitasse platea dictumst quisque sagittis purus sit. Iaculis urna id volutpat lacus laoreet non. Nec feugiat in fermentum posuere. Faucibus purus in massa tempor nec. In hendrerit gravida rutrum quisque. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi. Pharetra massa massa ultricies mi quis hendrerit dolor. Mattis aliquam faucibus purus in massa tempor.',
    },
    {
      label: 'Ownership of Materials',
      description:
        'Orci eu lobortis elementum nibh tellus. Sed risus pretium quam vulputate dignissim suspendisse in est ante. Et pharetra pharetra massa massa. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Pulvinar sapien et ligula ullamcorper malesuada proin. A diam sollicitudin tempor id eu nisl nunc mi. Tincidunt tortor aliquam nulla facilisi. Lorem donec massa sapien faucibus et molestie ac. Feugiat in ante metus dictum. Et netus et malesuada fames ac turpis egestas. Quis varius quam quisque id diam vel quam elementum pulvinar. Porttitor lacus luctus accumsan tortor posuere ac ut consequat semper. Nunc scelerisque viverra mauris in aliquam sem fringilla. Ipsum dolor sit amet consectetur. Facilisis volutpat est velit egestas dui id ornare arcu.',
    },
    {
      label: 'User Representations',
      description:
        'Aliquam id diam maecenas ultricies mi eget. Cras ornare arcu dui vivamus arcu. Aliquet nec ullamcorper sit amet risus. Blandit aliquam etiam erat velit scelerisque in dictum non. Nec ullamcorper sit amet risus nullam eget felis. Eu turpis egestas pretium aenean pharetra magna. Eu nisl nunc mi ipsum. Sit amet massa vitae tortor. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida. At volutpat diam ut venenatis tellus in. Nisl rhoncus mattis rhoncus urna. Odio euismod lacinia at quis risus. Morbi tristique senectus et netus et. Scelerisque purus semper eget duis at tellus at urna condimentum. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Eget nulla facilisi etiam dignissim diam. Ut eu sem integer vitae justo. Cras fermentum odio eu feugiat. At volutpat diam ut venenatis tellus in metus.',
    },
    {
      label: 'Copyright Policy',
      description:
        'Dignissim suspendisse in est ante in. Dolor sit amet consectetur adipiscing elit. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Quis lectus nulla at volutpat diam ut. A arcu cursus vitae congue. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. A erat nam at lectus. Arcu risus quis varius quam quisque id diam vel quam. Nunc sed id semper risus in hendrerit gravida rutrum. Pharetra massa massa ultricies mi quis hendrerit.',
    },
  ];



  return (
    <div className="terms-conditions container flex justify-center pr-5 pl-5 mt-40 mb-40">
      <Tabs aria-label="Basic Tabs " defaultValue={0}>
        <TabList className="flex flex-col lg:flex-row ">
          {titles.map((title, index) => (
            <Tab
              key={title}
              >
              {title}
            </Tab>
          ))}
        </TabList>
        {steps.map(({ label, description }, index) => (
          <TabPanel
            value={index}
            key={label}
            className=" w-full pr-10 pl-10 mt-16 mb-15 "
          >
            {description}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
