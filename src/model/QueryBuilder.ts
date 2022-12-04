import {IBeerFilters} from "../web/BeerFilter";
import {PipelineStage} from "mongoose";

export class QueryBuilder {
    static buildQuery(filters: IBeerFilters) {
        let query;
        if (filters.isLaudable && filters?.from && filters?.to) {
            if (filters.type) {
                query = [{
                    $match: {
                        type: filters.type,
                        productionDate: {
                            $gte: new Date(filters.from),
                            $lte: new Date(filters.to)
                        }
                    }
                },
                    {
                        $group: {
                            _id: "$productionDate",
                            quantity: {$sum: "$quantity"}
                        }
                    },
                    {$sort: {_id: -1 as any}},
                    {
                        $project: {
                            _id: 0,
                            day: {"$dateToString": {"format": "%Y-%m-%d", "date": "$_id"}},
                            quantity: 1,
                        }
                    }];
                return query;
            }

            query = [{
                $match: {
                    productionDate: {
                        $gte: new Date(filters.from),
                        $lte: new Date(filters.to)
                    }
                }
            },
                {
                    $group: {
                        _id: "$productionDate",
                        quantity: {$sum: "$quantity"}
                    }
                },
                {$sort: {_id: -1 as any}},
                {
                    $project: {
                        _id: 0,
                        day: {"$dateToString": {"format": "%Y-%m-%d", "date": "$_id"}},
                        quantity: 1,
                    }
                }];
            return query;
        }
        if (filters?.type) {
            if (filters?.day) {
                query = [{
                    $match: {
                        type: filters.type,
                        productionDate: new Date(filters.day)
                    }
                },
                    {
                        $group: {
                            _id: "$productionDate",
                            quantity: {$sum: "$quantity"}
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            type: filters.type,
                            productionDate: {"$dateToString": {"format": "%Y-%m-%d", "date": "$_id"}},
                            quantity: 1,
                        }
                    }]
                return query;
            }
            if (filters.from && filters.to) {
                query = [{
                    $match: {
                        type: filters.type,
                        productionDate: {
                            $gte: new Date(filters.from),
                            $lte: new Date(filters.to)
                        }
                    }
                },
                    {
                        $group: {
                            _id: "$type",
                            quantity: {$sum: "$quantity"}
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            type: "$_id",
                            from: filters.from,
                            to: filters.to,
                            quantity: 1,
                        }
                    }]
                return query;
            }
            query = [{
                $match: {
                    type: filters.type
                }
            },
                {
                    $group: {
                        _id: "$productionDate",
                        quantity: {$sum: "$quantity"}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        productionDate: {"$dateToString": {"format": "%Y-%m-%d", "date": "$_id"}},
                        quantity: 1,
                    }
                }]
            return query;
        }
        if (filters?.day) {
            query = [{
                $match: {
                    productionDate: new Date(filters.day)
                }
            },
                {
                    $group: {
                        _id: "$productionDate",
                        quantity: {$sum: "$quantity"}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        productionDate: {"$dateToString": {"format": "%Y-%m-%d", "date": "$_id"}},
                        quantity: 1,
                    }
                }]
            return query;
        }
        if (filters.from && filters.to) {
            query = [{
                $match: {
                    productionDate: {
                        $gte: new Date(filters.from),
                        $lte: new Date(filters.to)
                    }
                }
            },
                {
                    $group: {
                        _id: null,
                        quantity: {$sum: "$quantity"}
                    }
                },
                {
                    $project: {
                        _id: 0,
                        from: filters.from,
                        to: filters.to,
                        quantity: 1
                    }
                }]
            return query;
        }
    }
}

