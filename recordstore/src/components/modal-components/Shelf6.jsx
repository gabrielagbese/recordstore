import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf6() {
    const albums = [



        {
            name: 'Burna Boy - "Twice as Tall" (2020)',
            imgSrc: "/20-24/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/2pANu4qucnliJuRR94eZSV?utm_source=generator',
            description: "Grammy-winning album that solidified Burna Boy's international status, blending Afrobeats with pan-African messaging and global musical influences. The album featured collaborations with international artists and represented a landmark moment in African musical global recognition."
        },
        {
            name: 'Wizkid - "Made in Lagos" (2020)',
            imgSrc: "/20-24/image2.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/6HpMdN52TfJAwVbmkrFeBN?utm_source=generator',
            description: "A critically acclaimed album that refined Wizkid's global sound, featuring smooth R&B-infused Afrobeats tracks that became international hits. The project showcased Wizkid's ability to create a cohesive, sophisticated musical experience that transcended traditional genre boundaries."
        },
        {
            name: 'Davido - "A Better Time" (2020)',
            imgSrc: "/20-24/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "An album that continued Davido's global expansion with high-energy tracks and international collaborations. The project maintained his signature sound while demonstrating artistic growth and commercial appeal."
        },
        {
            name: 'Rema - "Rave & Roses" (2022)',
            imgSrc: "/20-24/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Introduced a new generation's sound with global streaming potential, featuring the viral hit 'Calm Down'. The album represented a breakthrough for Rema, showcasing his ability to blend alternative R&B with Afrobeats."
        },
        {
            name: 'Fireboy DML - "Apollo" (2020)',
            imgSrc: "/20-24/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Showcased an evolving melodic approach in contemporary Afrobeats, blending pop, R&B, and traditional African sounds. The album established Fireboy as a distinctive voice in the new generation of Nigerian artists."
        },
        {
            name: 'Shallipopi - "Presido La Pluto" (2023)',
            imgSrc: "/20-24/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "A breakout album featuring viral singles 'Elon Musk' and 'Cast', which dominated Nigerian street and online music scenes. The project showcased Shallipopi's distinctive street-hop style, leveraging social media and viral marketing to gain rapid popularity among younger audiences."
        },
        {
            name: 'Omah Lay - "Boy Alone" (2022)',
            imgSrc: "/20-24/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Represented an introspective alternative Afrobeats style, exploring personal themes with innovative musical production. The album showcased Omah Lay's unique approach to contemporary African music."
        },
        {
            name: 'Tems - "If Orange Was a Place" (2021)',
            imgSrc: "/20-24/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "An EP that showcased Tems' unique blend of alternative R&B and Afrobeats, featuring the breakout single 'Essence' with Wizkid. The project catapulted Tems to international recognition, particularly after the remix featuring Justin Bieber."
        },
        {
            name: 'Asake - "Mr Money with the Vibe" (2022)',
            imgSrc: "/20-24/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Introduced innovative street-hop influenced Afrobeats, becoming a massive commercial and critical success. The album represented a new wave of Nigerian street music gaining global attention."
        },
        {
            name: 'Rema - "Heis" (2024)',
            imgSrc: "/20-24/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Rema's 'Heis' further solidified his position as one of Afrobeats' brightest stars. The album showcases his versatility, seamlessly blending Afrobeats, R&B, and pop. Rema's infectious energy, combined with his catchy melodies and clever lyrics, has made him a global sensation"
        },
        {
            name: 'Tems - "Born in the Wild" (2024)',
            imgSrc: "/20-24/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Tems' soulful voice and introspective lyrics set her apart from her contemporaries. Born in the Wild was a bold statement, proving that Afrobeats can be both commercially successful and artistically significant."
        },
        {
            name: 'Asake - "Lungu Boy" (2024)',
            imgSrc: "/20-24/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: '"Lungu Boy" marked a significant evolution for Asake. While it received mixed reviews for its thematic depth, the albums innovative production and Asakes charismatic delivery showcased his artistic growth.'
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
                                <h1 className="mb-4 text-xl font-bold">2020–2024: Afrobeats' Global Dominance</h1>
                                <p className="max-w-2xl text-center">
                                    The era of complete global recognition, where Afrobeats artists won international awards, headlined global festivals, and transformed from a regional sound to a worldwide musical movement.
                                </p> </div>
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
                <CarouselPrevious className="fixed text-white transform -translate-y-1/2 bg-black top-1/2 left-4 sm:left-1/4 md:left-4" />
                <CarouselNext className="fixed text-white transform -translate-y-1/2 bg-black top-1/2 right-4 sm:right-1/4 md:right-4" />



            </Carousel>
        </div>
    );
}

export default Shelf6



