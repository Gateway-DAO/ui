import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Button, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { gqlAnonMethods } from '../../../../services/api';
import { GatesCard } from '../../../molecules/gates-card';

const style: SxProps = {
  bgcolor: 'background.paper',
  p: 3,
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default function GatePublishedModal({ gateId, open, handleClose }) {
  const router = useRouter();
  const [gate, setGate] = useState({
    title: '',
    image: '',
    description: '',
    categories: [],
    dao: {
      name: '',
    },
    id: '',
    published: '',
  });

  useEffect(() => {
    if (gateId) {
      gqlAnonMethods
        .gate({
          id: gateId,
        })
        .then((response) => {
          setGate(response.gates_by_pk);
        });
    }
  }, [gateId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          overflowY: 'auto',
        }}
      >
        <Box sx={style}>
          <Box>
            <Image
              src="/favicon-512.png"
              alt="gateway-logo"
              height={40}
              width={40}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h3"
                component="h3"
                fontSize={48}
                textAlign="center"
                sx={{
                  mb: 3,
                }}
              >
                Gate Published
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mb: 6, textAlign: 'center' }}
                fontSize={16}
              >
                You have published the{' '}
                <span style={{ color: '#D083FF' }}>{gate.title}</span> Gate from{' '}
                <span style={{ color: '#D083FF' }}>{gate.dao.name}</span>.
              </Typography>
            </Box>
            <GatesCard {...gate} />
            <Button
              variant="outlined"
              size="medium"
              sx={{ margin: '20px 0 0 20px' }}
              onClick={() => router.push(`/gate/${gateId}`)}
            >
              Check Gate
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
