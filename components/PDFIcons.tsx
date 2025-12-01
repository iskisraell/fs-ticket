import React from 'react';
import { Svg, Path, Circle, Line, Rect, Polyline } from '@react-pdf/renderer';

interface IconProps {
    size?: number;
    color?: string;
    style?: any;
}

export const MapPinIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Path
            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth={2} />
        <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth={2} />
        <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={2} />
    </Svg>
);

export const HashIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Line x1="4" y1="9" x2="20" y2="9" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Line x1="4" y1="15" x2="20" y2="15" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Line x1="10" y1="3" x2="8" y2="21" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <Line x1="16" y1="3" x2="14" y2="21" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth={2} />
        <Line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth={2} />
    </Svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke={color} strokeWidth={2} fill="none" />
        <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth={2} />
        <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth={2} />
        <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth={2} />
    </Svg>
);

export const CheckCircle2Icon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} fill="none" />
        <Path d="m9 12 2 2 4-4" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);

export const CameraIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" stroke={color} strokeWidth={2} fill="none" />
        <Circle cx="12" cy="13" r="3" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
);

export const ImagePlusIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="16" y1="5" x2="22" y2="5" stroke={color} strokeWidth={2} />
        <Line x1="19" y1="2" x2="19" y2="8" stroke={color} strokeWidth={2} />
        <Circle cx="9" cy="9" r="2" stroke={color} strokeWidth={2} fill="none" />
        <Path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
);

export const Building2Icon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" stroke={color} strokeWidth={2} fill="none" />
        <Path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke={color} strokeWidth={2} fill="none" />
        <Path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" stroke={color} strokeWidth={2} fill="none" />
        <Path d="M10 6h4" stroke={color} strokeWidth={2} />
        <Path d="M10 10h4" stroke={color} strokeWidth={2} />
        <Path d="M10 14h4" stroke={color} strokeWidth={2} />
        <Path d="M10 18h4" stroke={color} strokeWidth={2} />
    </Svg>
);

export const LayoutIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={2} fill="none" />
        <Line x1="3" y1="9" x2="21" y2="9" stroke={color} strokeWidth={2} />
        <Line x1="9" y1="21" x2="9" y2="9" stroke={color} strokeWidth={2} />
    </Svg>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = 'black', style }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
        <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
);
