import React, { useState, useMemo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select';
import { Card, CardContent } from '../ui/card';

// Import JSON data
import ccData from './data/cc.json';
import nativeData from './data/native.json';
import republicData from './data/republic.json';

import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NewspaperStand = () => {
    // Combine and parse articles from all sources
    const allArticles = useMemo(() => {
        const combinedArticles = [
            ...ccData.news_results.map(article => ({ ...article, sourceName: article.source.name })),
            ...nativeData.news_results.map(article => ({ ...article, sourceName: article.source.name })),
            ...republicData.news_results.map(article => ({ ...article, sourceName: article.source.name }))
        ];

        // Parse date and sort chronologically
        return combinedArticles
            .map(article => ({
                ...article,
                parsedDate: new Date(article.date.split(',')[0].trim())
            }))
            .sort((a, b) => b.parsedDate - a.parsedDate);
    }, []);

    // State for filtering sources and pagination
    const [selectedSource, setSelectedSource] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    // Filter articles based on selected source
    const filteredArticles = useMemo(() => {
        const filtered = selectedSource === 'All'
            ? allArticles
            : allArticles.filter(article => article.sourceName === selectedSource);

        return filtered;
    }, [selectedSource, allArticles]);

    // Paginate filtered articles
    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * articlesPerPage;
        return filteredArticles.slice(startIndex, startIndex + articlesPerPage);
    }, [filteredArticles, currentPage]);

    // Get unique sources
    const sources = ['All', ...new Set(allArticles.map(article => article.sourceName))];

    // Pagination calculations
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    // Pagination handlers
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="flex flex-col h-full max-h-[70vh] w-full max-w-[90vw]">
            <div className="sticky top-0 z-10 flex items-center justify-between mb-2 bg-white">
                <Select
                    onValueChange={(value) => {
                        setSelectedSource(value);
                        setCurrentPage(1);
                    }}
                    value={selectedSource}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Source" />
                    </SelectTrigger>
                    <SelectContent>
                        {sources.map(source => (
                            <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto">
                <div className="space-y-4">
                    {paginatedArticles.map((article, index) => (
                        <Card
                            key={index}
                            className="flex flex-col w-5/6 mx-6 cursor-pointer hover:bg-gray-50"
                            onClick={() => window.open(article.link, '_blank')}
                        >
                            <div className="flex items-center m-3 mb-2 space-x-2">
                                {article.source.icon && (
                                    <img
                                        src={article.source.icon}
                                        alt={`${article.sourceName} icon`}
                                        className="w-6 h-6 rounded-sm bg-slate-400"
                                    />
                                )}
                                <span className="font-bold text-md">{article.sourceName}</span>
                            </div>
                            {article.thumbnail && (
                                <div className="w-11/12 m-auto h-[250px]">
                                    <img
                                        src={article.thumbnail}
                                        alt={article.title}
                                        className="object-cover object-top w-full h-full"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col justify-between flex-grow p-4">


                                <div>
                                    <h3 className="mb-2 font-bold text-md line-clamp-3">{article.title}</h3>
                                    <p className="text-xs text-gray-500">
                                        {article.parsedDate.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewspaperStand;