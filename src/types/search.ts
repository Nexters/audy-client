import { TmapResponseType } from '@/apis/tmap/type';

export type SearchResultsType =
    TmapResponseType['getPoiSearch']['searchPoiInfo']['pois']['poi'];
