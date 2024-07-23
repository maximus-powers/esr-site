'use client';

import React, { useEffect, useState } from 'react';
import HackathonDetails from './Details';
import Timeline from '../account/components/MyAccount/HackathonParticipant/Timeline';
import Projects from './Projects';
import Apply from './Apply';
import OrganizerCard from './OrganizerCard';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

const HackathonPage = () => {
  const [hackathon, setHackathon] = useState(null);
  const [organizers, setOrganizers] = useState([]);
  const [error, setError] = useState('');
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(true);
  const { API_URL_PROD } = require('../config/config');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const hackathonId = query.get('id');

    if (hackathonId) {
      fetchHackathonDetails(hackathonId);
    }
  }, []);

  const fetchHackathonDetails = async (hackathonId) => {
    try {
      const response = await fetch(`${API_URL_PROD}/hackathon_details/${hackathonId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setHackathon(data);

      if (data.hackathon_info.organizer_emails_list) {
        fetchOrganizers(data.hackathon_info.organizer_emails_list);
      }
    } catch (error) {
      setError(`Failed to fetch hackathon details: ${error.message}`);
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const fetchOrganizers = async (emails) => {
    try {
      const uniqueEmails = [...new Set(emails)];
      const organizersData = await Promise.all(
        uniqueEmails.map(email =>
          fetch(`${API_URL_PROD}/get_profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
          }).then(res => res.json())
        )
      );
      setOrganizers(organizersData);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">{error}</p>
        </div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="flex items-center justify-center m-5 md:m-20">
        <div className="p-8 border-4 border-black bg-white">
          <p className="text-xl text-black">Loading...</p>
        </div>
      </div>
    );
  }

  const handleTimelineExpandClick = () => {
    setIsTimelineExpanded((prev) => !prev);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col m-5 my-10 md:m-20 max-w-3xl">
        <HackathonDetails hackathon={hackathon} />

        <Apply hackathon={hackathon.hackathon_info} />

        <div className="w-full mt-4 mb-4 border border-gray-300 rounded-lg">
          <div
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={handleTimelineExpandClick}
          >
            <h3 className="text-xl font-semibold">Hackathon Timeline</h3>
            <div>
              {isTimelineExpanded ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
            </div>
          </div>
          {isTimelineExpanded && (
            <div className="">
              <Timeline hackathonId={hackathon.hackathon_info.id} />
            </div>
          )}
        </div>
        {/* <Projects projects={hackathon.hackathon_projects} /> */}


        <div className="w-full mb-4 border border-gray-300 rounded-lg p-4">
          <h3 className="text-xl font-semibold">Organizers</h3>
          <div className="flex flex-wrap">
            {organizers.map((organizer, index) => (
              <OrganizerCard key={index} organizer={organizer} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HackathonPage;
