import dynamic from 'next/dynamic';

const DirectWallets = dynamic(
  () =>
    import(
      '../components/templates/create-gate/tasks/direct/direct-wallets'
    ).then((mod) => mod.DirectWallets),
  {
    ssr: false,
  }
);

export default function Test() {
  return (
    <>
      <DirectWallets />
    </>
  );
}
