import React, { useEffect, useState } from 'react';
import './style.css';

interface Name {
  title: string;
  first: string;
  last: string;
}

interface User {
  name: Name;
  email: string;
  phone: string;
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };
}

const ContactCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const userData = data.results[0];
      setUser(userData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    user && (
      <div className="contact-card-container">
        <div className="contact-card">
          <div className="contact-card-header">Contact Card</div>
          <div className="contact-card-info">
            <div className="contact-card-details">
            <div className="contact-card-image">
              <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
            </div>
              <p><strong>Title:</strong> {user.name.title}</p>
              <p><strong>First Name:</strong> {user.name.first}</p>
              <p><strong>Last Name:</strong> {user.name.last}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.dob.age}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ContactCard;
