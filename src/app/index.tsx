import { Stack, Link } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { InternalizationExample } from '~/components/InternalizationExample';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home">
          <InternalizationExample />
        </ScreenContent>

        <Link href={{ pathname: '/counter-example' }} asChild>
          <Button title="Go to counter Example" />
        </Link>

        <Link href={{ pathname: '/location-example' }} asChild>
          <Button title="Go to location Example" />
        </Link>

        <Link href={{ pathname: '/map-example' }} asChild>
          <Button title="Go to map Example" />
        </Link>

        <Link
          href={{
            pathname: '/details',
            params: { name: 'Dan' },
          }}
          asChild>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
}
