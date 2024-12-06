import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf2() {
    const albums = [
        {
            name: '2Baba - Face 2 Face (2004)',
            imgSrc: "/01-04/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Featuring timeless hits like African Queen and Nfana Ibaga, this album brought Nigerian pop music to a global stage. Its melodic sound and heartfelt lyrics became the blueprint for modern Afrobeats’ romantic ballads.'
        },
        {
            name: 'Tony Tetuila - E Go Better (2004)',
            imgSrc: "/01-04/image2.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With tracks like My Car, Tony Tetuila brought relatable, humorous storytelling to Afrobeats, blending highlife-inspired melodies with hip-hop influences. The album captured Nigerias urban lifestyle and solidified him as a genre-defining artist.'
        },
        {
            name: 'Plantashun Boiz - Body and Soul (2000)',
            imgSrc: "/01-04/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This collaborative effort by 2Baba, Blackface, and Faze delivered harmonized vocals and heartfelt lyrics. The album’s soulful tracks, including Knock Me Off, set the foundation for group dynamics in Afrobeats.'
        },
        {
            name: 'Styl-Plus - Olufunmi (2005)',
            imgSrc: "/01-04/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Known for their smooth harmonies and R&B influence, this album featured romantic ballads that resonated with fans. Tracks like Olufunmi showcased the emotional and melodic potential of Afrobeats.'
        },
        {
            name: 'Ruggedman - Thy Album Come (2005)',
            imgSrc: "/01-04/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Ruggedman’s lyrical sharpness and fusion of hip-hop with Afrobeats paved the way for rap in the Nigerian music scene. His work appealed to a burgeoning youth culture.'
        },
        {
            name: 'Eedris Abdulkareem - Mr. Lecturer (2002)',
            imgSrc: "/01-04/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'A bold critique of societal corruption, this album proved Afrobeats could address serious issues. Eedris set a precedent for activist themes in music.'
        },
        {
            name: 'Lagbaja - We Before Me (2000)',
            imgSrc: "/01-04/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With its masked persona and complex instrumentation, this album brought Afrobeat elements into the modern era. Lagbaja’s work inspired creativity and artistic individuality.'
        },
        {
            name: 'DJ Jimmy Jatt - The Definition (2005)',
            imgSrc: "/01-04/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'A collaborative project that featured rising stars, showcasing Afrobeats’ collective energy. Jimmy Jatt’s mixtape format highlighted the genre’s diversity.'
        },
        {
            name: 'P-Square - Last Nite (2003)',
            imgSrc: "/01-04/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This debut album introduced the twin brothers’ blend of Afrobeats, R&B, and dancehall, with hits like Senorita. Their synchronized choreography and polished sound became a hallmark of their career.'
        },
        {
            name: 'P-Square - Get Squared (2005)',
            imgSrc: "/01-04/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Get Squared was pivotal in popularizing Afrobeats across Africa and beyond, demonstrating how modern production techniques and relatable themes could amplify the genre’s appeal. Its success set the stage for P-Square to become one of Nigerias most celebrated musical acts.'
        },
        {
            name: 'Eedris Abdulkareem - Pass (2003)',
            imgSrc: "/01-04/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Famous for the politically charged Nigeria Jaga Jaga, this album tackled societal issues with unflinching honesty. Eedris’s bold approach demonstrated the genre’s ability to address political and social themes.'
        },
        {
            name: 'D’banj - No Long Thing (2005)',
            imgSrc: "/01-04/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Produced by Don Jazzy with hits like Tongolo and Socor, No Long Thing showcased the innovative blend of Afrobeat and hip-hop that became the Mo’Hits label’s signature. The album’s success not only launched D’banj’s career but also marked the beginning of an era of Afrobeats as a dominant genre in Africa.'
        },

    ];

    return (
        <div className="w-full h-full mx-auto">
            <Carousel className="relative w-full h-full">
                <CarouselContent className="h-full ">
                    {/* First slide: Cover and Intro */}
                    <CarouselItem className="h-full">
                        <Card className="relative h-full p-5 overflow-y-auto bg-white/65 border-gray-800/30">
                            <div className="flex flex-col items-center justify-center min-h-full">
                                <img
                                    src="https://via.placeholder.com/800x400"
                                    alt="Album Collection Cover"
                                    className="w-full max-w-[400px] mb-4 rounded-lg shadow-lg"
                                />
                                <h1 className="mb-4 text-xl font-bold">2000–2005: The Birth of Afrobeats: </h1>
                                <p className="max-w-2xl text-center">
                                    Afrobeats emerged as a genre distinct from its predecessors, incorporating urban influences like hip-hop, R&B, and dancehall. Artists embraced youthful energy, crafting hits for local and diaspora audiences.
                                </p>
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

export default Shelf2



