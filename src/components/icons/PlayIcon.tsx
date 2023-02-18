import { IconProps } from 'src/models';

function PlayIcon({ color, size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 7.325V12.675C7.5 13.0583 7.675 13.35 8.025 13.55C8.375 13.75 8.71667 13.7333 9.05 13.5L13.2 10.85C13.5167 10.65 13.675 10.3667 13.675 10C13.675 9.63333 13.5167 9.35 13.2 9.15L9.05 6.5C8.71667 6.26667 8.375 6.25 8.025 6.45C7.675 6.65 7.5 6.94167 7.5 7.325ZM10 20C8.61667 20 7.31667 19.7377 6.1 19.213C4.88333 18.6883 3.825 17.9757 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787001C7.31667 0.261668 8.61667 -0.000665399 10 1.26743e-06C11.3833 1.26743e-06 12.6833 0.262668 13.9 0.788001C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z"
        fill={color}
      />
    </svg>
  );
}

export default PlayIcon;
