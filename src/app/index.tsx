import { Stack, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('navigation.home') }} />
      <Container>

      </Container>
    </>
  );
}