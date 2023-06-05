import { SvgIcon, SvgIconProps } from '@mui/material';

export function PolygonCircleIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 0 800 800"
      {...props}
    >
      <circle fill="#8247e5" cx="400" cy="400" r="375.5" />
      <path
        fill="#fff"
        d="M524.29,319.66c-9-5.24-20.72-5.24-30.62,0l-70.25,40.17L375.68,386,305.43,426.2c-9,5.24-20.71,5.24-30.62,0L219,394.76c-9-5.24-15.31-14.84-15.31-25.32v-62A28.18,28.18,0,0,1,219,282.11l54.94-30.56c9-5.24,20.71-5.24,30.62,0l54.94,30.56c9,5.24,15.31,14.85,15.31,25.32V347.6l47.74-27.07V280.36A28.18,28.18,0,0,0,407.2,255L305.43,197.4c-9-5.23-20.71-5.23-30.62,0L171.24,255a28.18,28.18,0,0,0-15.32,25.32V396.51a28.18,28.18,0,0,0,15.32,25.32l103.57,57.64c9,5.24,20.71,5.24,30.62,0l70.25-39.3,47.74-27.07,70.25-39.3c9-5.24,20.71-5.24,30.62,0l54.94,30.57c9,5.24,15.31,14.84,15.31,25.32v62A28.2,28.2,0,0,1,579.23,517l-54.94,31.43c-9,5.24-20.72,5.24-30.62,0l-54.94-30.56c-9-5.24-15.31-14.85-15.31-25.32V452.4l-47.74,27.07v40.17A28.19,28.19,0,0,0,391,545L494.57,602.6c9,5.23,20.71,5.23,30.62,0L628.76,545c9-5.24,15.31-14.84,15.31-25.32V403.49a28.17,28.17,0,0,0-15.31-25.32Z"
      />
      <rect fill="none" width="800" height="800" />
    </SvgIcon>
  );
}