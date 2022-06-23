export const badgeProps = (badge) =>
  badge
    ? {
        src: badge?.ipfsURL && `https://ipfs.infura.io/ipfs/${badge.ipfsURL}`,
        alt: badge?.name,
      }
    : undefined;
