import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf1() {
    const albums = [
        {
            name: 'Fela Kuti - Zombie (1977)',
            imgSrc: "/pre2000/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/51kRDjKcrYrQfFmOktFh32?utm_source=generator',
            description: 'A fearless critique of the Nigerian military, Zombie showcased Fela’s ability to blend complex rhythms with bold political commentary. Its rebellious spirit inspired subsequent generations to use music as a tool for social change.'
        },
        {
            name: 'King Sunny Ade - Juju Music (1982)',
            imgSrc: "/pre2000/image2.jpg",
            spotifyEmbed: "https://open.spotify.com/embed/album/3Z7IpHf4cbe4NUEwnXSxXq?utm_source=generator",
            description: 'This album introduced Nigerian juju music to global audiences, featuring innovative guitar work and Western production techniques. It opened international doors for African music and inspired the fusion of traditional and modern styles.'
        },
        {
            name: 'Onyeka Onwenu - One Love (1986)',
            imgSrc: "/pre2000/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/76XBrYBz1RcuVUIQJausHi?utm_source=generator',
            description: 'A blend of highlife and soulful vocals, this album emphasized themes of unity and social progress. Onyeka’s artistry paved the way for women in the male-dominated Nigerian music industry.'
        },
        {
            name: 'Shina Peters - Ace (Afro-Juju Series 1) (1989)',
            imgSrc: "/pre2000/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/5teAikgdXjCxHb8wHNJDaq?utm_source=generator',
            description: 'This groundbreaking work combined juju and Afrobeat, creating the Afro-juju genre. Its infectious energy and danceable beats revolutionized Nigerian party music.'
        },
        {
            name: 'Majek Fashek - Prisoner of Conscience (1988)',
            imgSrc: "/pre2000/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/5K88mmbH7fcl6ojBxHWN45?utm_source=generator',
            description: 'Featuring the hit Send Down the Rain, this album infused reggae with African spirituality and advocacy for freedom. It showcased the potential for cross-genre innovation in Nigerian music.'
        },
        {
            name: 'Sir Victor Uwaifo - Guitar Boy Superstar (1971)',
            imgSrc: "/pre2000/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/6bhj9gdMkEegi5UfmLwS0v?utm_source=generator',
            description: 'This album introduced Nigerian juju music to global audiences, featuring innovative guitar work and Western production techniques. It opened international doors for African music and inspired the fusion of traditional and modern styles.'
        },
        {
            name: 'Femi Kuti - Femi Kuti (1995)',
            imgSrc: "/pre2000/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/6VrhPe4z1gPzeXAXW02I1y?utm_source=generator',
            description: 'Femi carried forward his father’s Afrobeat legacy, adding funk and jazz elements. This album modernized the genre and made Afrobeat more accessible to younger audiences.'
        },
        {
            name: 'Oliver De Coque - People’s Club of Nigeria (1981)',
            imgSrc: "/pre2000/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0lk3fl59TwHVHRYZBzr5ah?utm_source=generator',
            description: 'By incorporating Igbo rhythms and highlife, this album celebrated Nigerian culture and identity. It introduced the concept of music as a unifying social force.'
        },
        {
            name: 'Evi Edna Ogholi - My Kind of Music (1987)',
            imgSrc: "/pre2000/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Ogholi’s reggae-inspired sound resonated with grassroots movements and cultural pride. Her success demonstrated that regional influences could have broad appeal.'
        },
        {
            name: 'Christy Essien-Igbokwe - Ever Liked My Person (1981)',
            imgSrc: "/pre2000/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0SDvbLDUqNufWrHnkY0dIN?utm_source=generator',
            description: 'A mix of highlife and early Afrobeat, this album tackled themes of love and societal expectations. Christy’s work set a precedent for personal storytelling in Nigerian music.'
        },
        {
            name: 'Chief Ebenezer Obey - Current Affairs (1980)',
            imgSrc: "/pre2000/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This album popularized juju music with its socially conscious lyrics and intricate instrumentation. It reinforced the role of music as a commentary on contemporary issues.'
        },
        {
            name: 'Alex Zitto - Tickle Me (1993)',
            imgSrc: "/pre2000/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Combining funk and highlife, Zitto’s work hinted at the emerging urban soundscape. This album bridged traditional Nigerian music and contemporary pop.'
        },
    ];

    return (
        <div className="w-full h-full mx-auto ">
            <Carousel className="relative w-full h-full ">
                <CarouselContent className="h-full ">
                    {/* First slide: Cover and Intro */}
                    <CarouselItem className="h-max">
                        <Card className="relative h-full p-5 overflow-y-auto bg-white/65 border-gray-800/30">
                            <div className="flex flex-col items-center justify-center min-h-full">
                                <img
                                    src="https://via.placeholder.com/800x400"
                                    alt="Album Collection Cover"
                                    className="w-full max-w-[400px] mb-4 rounded-lg shadow-lg"
                                />
                                <h1 className="mt-4 mb-4 text-xl font-bold">Pre-2000: The Roots of Modern Afrobeats</h1>
                                <p className="max-w-2xl text-center md:text-lg">
                                    This era was foundational, influenced by Afrobeat, highlife, and juju music. The music laid the groundwork for what would become Afrobeats by combining African tradition with modern instrumentation.                                </p>
                            </div>
                        </Card>
                    </CarouselItem>

                    {/* Subsequent slides for each album */}
                    {albums.map((album, index) => (
                        <CarouselItem key={index} className="h-full">
                            <Card className="relative h-full p-5 overflow-y-auto shadow-md backdrop-blur-md bg-white/45 border-gray-800/30">
                                <div className="flex flex-col items-center min-h-full">
                                    <h2 className="mb-6 font-semibold text-lg md:text-xl h-[25px]">{album.name}</h2>
                                    <img
                                        src={album.imgSrc}
                                        alt={`${album.name} Cover`}
                                        className="w-[150px] h-[150px] object-cover mb-4 rounded-lg shadow-md"
                                    />

                                    <p className="mt-4 text-center max-w-[400px] h-[150px] text-sm md:text-base overflow-hidden text-ellipsis line-clamp-4">{album.description}</p>
                                    <Accordion type="single" collapsible className="w-full max-w-[400px]">
                                        <AccordionItem value="spotify-embed">
                                            <AccordionTrigger>Listen to the Album</AccordionTrigger>
                                            <AccordionContent>
                                                <iframe
                                                    src={album.spotifyEmbed}
                                                    width="100%"
                                                    height="380"
                                                    frameBorder="0"
                                                    allow="encrypted-media"
                                                    className="rounded-lg"
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="fixed text-white transform -translate-y-1/2 bg-black top-1/2 left-4 sm:left-1/4" />
                <CarouselNext className="fixed text-white transform -translate-y-1/2 bg-black top-1/2 right-4 sm:right-1/4 " />



            </Carousel>
        </div>
    );
}

export default Shelf1



