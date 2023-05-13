import './podcast-list-page.css';

import React from 'react';

import Card from '@/components/card';
import Input from '@/components/input';

export default function PodcastListPage() {
  const podcasts = Array.from({ length: 100 }, (_, index) => ({
    id: index,
    logo: `https://picsum.photos/seed/${index}/200/200`,
    title: `Podcast ${index}`,
    author: `Author ${index}`
  }));

  return (
    <div className="podcast-list-page">
      <header>
        <p>{podcasts.length}</p>
        <Input placeholder="Filter podcasts..." type="search" />
      </header>
      <main>
        <ul>
          {podcasts.map((podcast) => (
            <li key={podcast.id}>
              <Card>
                <Card.Image src={podcast.logo}></Card.Image>
                <Card.Body>
                  <Card.Title tag="h2">{podcast.title}</Card.Title>
                  <span>{`Author: ${podcast.author}`}</span>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
