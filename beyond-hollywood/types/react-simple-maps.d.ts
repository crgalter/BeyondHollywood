declare module 'react-simple-maps' {
    import * as React from 'react';

    export interface ComposableMapProps {
        width?: number;
        height?: number;
        projection?: string | ((...args: any[]) => any);
        projectionConfig?: {
            scale?: number;
            center?: [number, number];
            rotate?: [number, number, number];
            parallels?: [number, number];
            clipAngle?: number;
            clipExtent?: [[number, number], [number, number]];
            precision?: number;
        };
        style?: React.CSSProperties;
        className?: string;
        children?: React.ReactNode;
    }

    export interface GeographiesProps {
        geography?: string | Record<string, any> | string[];
        children?: (props: { geographies: any[]; outline: any; borders: any }) => React.ReactNode;
        parseGeographies?: (geos: any[]) => any[];
        className?: string;
    }

    export interface GeographyProps {
        geography?: any;
        onMouseEnter?: (event: React.MouseEvent) => void;
        onMouseLeave?: (event: React.MouseEvent) => void;
        onMouseDown?: (event: React.MouseEvent) => void;
        onMouseUp?: (event: React.MouseEvent) => void;
        onClick?: (event: React.MouseEvent) => void;
        onFocus?: (event: React.FocusEvent) => void;
        onBlur?: (event: React.FocusEvent) => void;
        style?: {
            default?: React.CSSProperties;
            hover?: React.CSSProperties;
            pressed?: React.CSSProperties;
        };
        className?: string;
    }

    export interface ZoomableGroupProps {
        center?: [number, number];
        zoom?: number;
        minZoom?: number;
        maxZoom?: number;
        onMoveStart?: (event: any, position: any) => void;
        onMoveEnd?: (event: any, position: any) => void;
        onMove?: (event: any, position: any) => void;
        translateExtent?: [[number, number], [number, number]];
        filterZoomEvent?: (event: any) => boolean;
        children?: React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
    }

    export const ComposableMap: React.FC<ComposableMapProps>;
    export const Geographies: React.FC<GeographiesProps>;
    export const Geography: React.FC<GeographyProps>;
    export const ZoomableGroup: React.FC<ZoomableGroupProps>;
    export const Sphere: React.FC<any>;
    export const Graticule: React.FC<any>;
}
