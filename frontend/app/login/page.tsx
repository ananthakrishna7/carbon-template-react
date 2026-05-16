'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, TextInput, PasswordInput, Button, InlineNotification } from '@carbon/react';
import { api } from '../../api';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', {
        username,
        password,
      });
      console.log('Login successful:', response);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Try admin / password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f4f4' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'white', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '1.5rem', fontSize: '2rem', fontWeight: 400 }}>Log in</h1>

        {error && (
          <InlineNotification
            kind="error"
            title="Error"
            subtitle={error}
            style={{ marginBottom: '1.5rem' }}
            onCloseButtonClick={() => setError('')}
          />
        )}

        <Form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <TextInput
              id="username"
              labelText="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <PasswordInput
              id="password"
              labelText="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <Button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Log in'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
