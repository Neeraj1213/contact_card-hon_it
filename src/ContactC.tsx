import React, { useEffect, useState } from 'react';

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
      <div className="contact-card">
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
        <h2>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Age: {user.dob.age}</p>
      </div>
    )
  );
};

export default ContactCard;
