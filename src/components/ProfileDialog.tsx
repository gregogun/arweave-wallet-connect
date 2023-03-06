import { DialogOverlay, DialogTrigger } from '@aura-ui/react';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { ArAccount } from 'arweave-account';
import { config } from '../config';
import { styled, Box, Dialog, DialogContent, Flex, IconButton, Typography } from '@aura-ui/react';
import { Image } from './Image';

const BlueIconButton = styled(IconButton, {
  $$bg: '$colors$blue3',
  $$border: '$colors$blue7',
  $$color: '$colors$blue11',

  // hover styles
  $$bgHover: '$colors$blue4',
  $$borderHover: '$colors$blue8',

  // active styles
  $$bgActive: '$colors$blue5',
  $$borderActive: '$colors$blue8',

  // solid default styles
  $$bgSolid: '$colors$blue9',
  $$colorSolid: 'white',
  // solid hover styles
  $$bgSolidHover: '$colors$blue10',
  // solid active styles
  $$bgSolidActive: '$colors$blue10',
});

interface ProfileDialogProps {
  account: ArAccount | undefined;
  children: React.ReactNode;
}

export const ProfileDialog = ({ children, account }: ProfileDialogProps) => {
  const links = account?.profile.links;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay />
      <DialogContent
        css={{
          maxWidth: 450,
          left: '50%',
          boxShadow: '0 0 0 2px $colors$slate6',
          display: 'flex',
          flexDirection: 'column',
          gap: '$2',
          br: '$4',
        }}
      >
        <Image
          css={{
            width: '100%',
            height: 96,
          }}
          src={
            account?.profile.avatarURL === config.accountAvatarDefault
              ? account?.profile.avatarURL
              : `${config.boringAvatars}/120/${account?.addr}?square`
          }
        />
        <Image
          css={{
            position: 'fixed',
            boxShadow: '0 0 0 4px $colors$slate1',
            width: 80,
            height: 80,
            top: '$14',
            left: '$8',
            br: '$round',
          }}
          src={
            account?.profile.avatarURL === config.accountAvatarDefault
              ? account?.profile.avatarURL
              : `${config.boringAvatars}/120/${account?.addr}?square`
          }
        />
        <Flex
          direction="column"
          gap="3"
          css={{
            mx: '$5',
            mt: '$12',
            mb: '$6',
            boxShadow: '0 0 0 1px $colors$slate6',
            br: '$3',
            p: '$5',
          }}
        >
          {account?.txid ? (
            <Flex css={{ width: '100%' }} justify="between" align="center">
              <Typography contrast="hiContrast" size="5" weight="6">
                {account?.profile.handleName ? account?.profile.handleName : account?.handle}
              </Typography>
              <Flex direction="column" gap="1">
                <Typography size="2">{account?.handle}</Typography>
              </Flex>
            </Flex>
          ) : (
            <Typography size="5" weight="6">
              {account?.handle}
            </Typography>
          )}
          <Box css={{ width: '100%', height: 1, backgroundColor: '$slate6' }} />
          <Flex direction="column">
            <Typography contrast="hiContrast" weight="6">
              Bio
            </Typography>
            <Typography css={{ textAlign: 'start' }}>
              {account?.profile.bio ? account?.profile.bio : 'No bio.'}
            </Typography>
          </Flex>
          <Flex css={{ mt: '$3' }} direction="column">
            <Typography contrast="hiContrast" weight="6">
              Socials
            </Typography>
            <Flex css={{ mt: '$3' }} gap="3">
              {links && Object.keys(links).length === 0 && (
                <Typography>No social links.</Typography>
              )}
              {links?.twitter && (
                <BlueIconButton
                  variant="ghost"
                  as="a"
                  href={`${config.twitterUrl}/${links.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterLogoIcon />
                </BlueIconButton>
              )}
              {links?.github && (
                <IconButton
                  variant="ghost"
                  as="a"
                  href={`${config.githubUrl}/${links.github}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubLogoIcon />
                </IconButton>
              )}
            </Flex>
          </Flex>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};
