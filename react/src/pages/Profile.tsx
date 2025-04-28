import React from 'react';
import { useUser } from '../context/UserContext';
import { getBadge } from '../utils/badgeUtils';

const Profile: React.FC = () => {
  const { email, ecoPoints } = useUser();
  const { badge, next } = getBadge(ecoPoints);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">プロフィール</h2>
      <p><strong>メール:</strong> {email}</p>
      <p><strong>エコポイント:</strong> {ecoPoints}</p>
      <div className="badge-box my-3">
        <span style={{ fontSize: '2rem' }}>{badge.icon}</span>
        <p className="mt-2">{badge.name}</p>
        <p className="text-muted">{badge.description}</p>
        {next && (
          <p className="text-secondary">
            次のバッジ ({next.name}) まであと {next.pointThreshold - ecoPoints} ポイント
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;