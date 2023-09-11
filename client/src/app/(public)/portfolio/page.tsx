'use client';

import "@/styles/app/unauth/portfolio.scss";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import Image from 'next/image';

const steps = [
  {
    title: 'All',
    images: [
      {
        img: 'https://picsum.photos/id/135/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/12/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/67/1000/1000',
        alt: 'Camera',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/96/1000/1000',
        alt: 'Coffee',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/66/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/66/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 4,
      },
      {
        img: 'https://picsum.photos/id/33/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 4,
      },
      {
        img: 'https://picsum.photos/id/22/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
    ],
  },
  {
    title: 'UI / UX',
    images: [
      {
        img: 'https://picsum.photos/id/736/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 4,
      },
      {
        img: 'https://picsum.photos/id/67/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/34/1000/1000',
        alt: 'Camera',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/432/1000/1000',
        alt: 'Coffee',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/123/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/53/1000/1000',
        alt: 'Honey',
        author: '@arwinneil',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/34/1000/1000',
        alt: 'Breakfast',
        rows: 2,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/158/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 3,
      },
    ],
  },
  {
    title: 'Logo & Brand identity',
    images: [
      {
        img: 'https://picsum.photos/id/135/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/12/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/67/1000/1000',
        alt: 'Camera',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/96/1000/1000',
        alt: 'Coffee',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/66/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/76/1000/1000',
        alt: 'Honey',
        author: '@arwinneil',
        rows: 1,
        cols: 4,
      },
      {
        img: 'https://picsum.photos/id/66/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/33/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/22/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
    ],
  },
  {
    title: 'Graphic',
    images: [
      {
        img: 'https://picsum.photos/id/20/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/43/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/1000/347/1000',
        alt: 'Camera',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/444/1000/1000',
        alt: 'Coffee',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/547/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/22/1000/1000',
        alt: 'Honey',
        author: '@arwinneil',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/78/1000/1000',
        alt: 'Breakfast',
        rows: 2,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/83/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/95/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 4,
      },
      {
        img: 'https://picsum.photos/id/123/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
    ],
  },
  {
    title: 'Animation',
    images: [
      {
        img: 'https://picsum.photos/id/10/1000/1000',
        alt: 'Breakfast',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/11/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/30/1000/1000',
        alt: 'Camera',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/50/1000/1000',
        alt: 'Coffee',
        rows: 2,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/46/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/43/1000/1000',
        alt: 'Honey',
        author: '@arwinneil',
        rows: 1,
        cols: 2,
      },
      {
        img: 'https://picsum.photos/id/3/1000/1000',
        alt: 'Breakfast',
        rows: 2,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/39/1000/1000',
        alt: 'Burger',
        rows: 1,
        cols: 3,
      },
      {
        img: 'https://picsum.photos/id/185/1000/1000',
        alt: 'Breakfast',
        rows: 1,
        cols: 3,
      },
    ],
  },
];

export default function Portfolio() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="portfolio container flex flex-col pr-5 pl-5 mt-40 mb-40">
        <h2 className="mb-10 text-3xl text-center">Ovioo <strong>projects</strong></h2>
        <Tabs aria-label="Basic tabs" defaultValue={0}>
          <TabList className=" w-full justify-center flex flex-col lg:flex-row">
            {steps.map(({ title }, i) => (
              <Tab key={i + '-tab'}>{title}</Tab>
            ))}
          </TabList>

          {steps.map(({ images }, i) => (
            <TabPanel key={i + '-tab-panel'} value={i}>
              <ImageList
                className="w-full px-5 "
                variant="quilted"
                cols={6}
                gap={60}
              >
                {images.map(
                  (
                    {
                      img,
                      alt,
                      cols = 1,
                      rows = 1,
                    }: {
                      img: string;
                      alt: string;
                      cols?: number;
                      rows?: number;
                    },
                    index
                  ) => (
                    <ImageListItem key={index + 'img'} cols={cols} rows={rows}>
                      <Image
                        className="img w-full h-full"
                        src={`${img}?w=${90 * cols}&h=${
                          270 * rows
                        }&fit=crop&auto=format`}
                        alt={alt}
                        loading="lazy"
                        width={3446}
                        height={1260}
                      />
                    </ImageListItem>
                  )
                )}
              </ImageList>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </>
  );
}
