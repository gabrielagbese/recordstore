import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf3() {
    const albums = [
        {
            name: 'D’banj - The Entertainer (2008)',
            imgSrc: "/06-10/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Packed with hits like Gbono Feli Feli and Fall in Love, this album solidified D’banj’s status as a superstar. Its vibrant production by Don Jazzy defined the Mo’Hits sound and fueled Afrobeats’ pop dominance.'
        },
        {
            name: 'Wande Coal - Mushin 2 Mo’Hits (2009)',
            imgSrc: "/06-10/image2.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With mega-hits like Do Me and No One Like You, this album was a commercial triumph. P-Square’s blend of R&B and Afrobeats, coupled with heartfelt ballads, expanded their appeal across Africa.'
        },
        {
            name: 'P-Square - Game Over (2007)',
            imgSrc: "/06-10/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With mega-hits like Do Me and No One Like You, this album was a commercial triumph. P-Square’s blend of R&B and Afrobeats, coupled with heartfelt ballads, expanded their appeal across Africa.'
        },
        {
            name: '2Baba - Grass 2 Grace (2006)',
            imgSrc: "/06-10/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Featuring hits like True Love and For Instance, this album reinforced 2Baba’s reputation as a musical genius. Its themes of love and social consciousness became defining characteristics of his artistry.'
        },
        {
            name: 'Asa - Asa (2007)',
            imgSrc: "/06-10/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This self-titled debut featured soulful tracks like Jailer and Fire on the Mountain. Asa’s fusion of folk, jazz, and Afrobeat created a unique space for conscious music in Nigeria.'
        },

        {
            name: '9ice - Gongo Aso (2008)',
            imgSrc: "/06-10/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This album brought a distinct Yoruba flavor to Afrobeats, with hits like Street Credibility and Party Rider. 9ice’s poetic lyricism and traditional influences made the album a cultural touchstone.'
        },
        {
            name: 'Olu Maintain - Yahoozee (2007)',
            imgSrc: "/06-10/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'The single Yahoozee from this album became a cultural phenomenon, with its infectious rhythm and dance moves capturing the essence of Afrobeats’ party appeal.'
        },
        {
            name: ' 2Baba - The Unstoppable (2009)',
            imgSrc: "/06-10/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'The Unstoppable is one of Tuface’s most impactful albums, blending Afrobeat, R&B, and pop influences. The album features hits like Implication and Only Me, which highlight his distinctive voice and songwriting prowess. The production was marked by its seamless mix of international influences with Nigerian sounds, giving it both local and global appeal.'
        },
        {
            name: 'Naeto C - You Know My P (2008)',
            imgSrc: "/06-10/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Naeto C’s You Know My P was a groundbreaking album that seamlessly blended hip-hop with Afrobeats, positioning him as a leading force in Nigerian music. The album featured the hit single Kini Big Deal, a track that became an anthem for the urban youth, with its catchy hook and infectious beat. '
        },
        {
            name: 'Darey - UnDareyted (2009)',
            imgSrc: "/06-10/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: ' UnDareyted’s smooth production, combined with conscious and vibrant lyricism, set it apart from other contemporary releases. The album contributed to the growing global appeal of Nigerian music by offering a fresh take on the fusion of genres, highlighting the genre’s unique ability to evolve and experiment.'
        },
        {
            name: 'M.I. - Talk About It (2008)',
            imgSrc: "/06-10/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'M.I’s debut album brought a fresh, hip-hop-influenced sound to the Nigerian music scene, with Safe and Crowd Mentality becoming major anthems. He bridged the gap between Afrobeat and rap, helping to elevate Nigerian hip-hop within Afrobeats.'
        },
        {
            name: 'Timaya - True Story (2007)',
            imgSrc: "/06-10/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With socially conscious tracks like Dem Mama, Timaya’s debut brought a raw, reality-based perspective to Afrobeats, connecting deeply with audiences in the Niger Delta and beyond.'
        },

    ];

    return (
        <div className="w-full h-full mx-auto">
            <Carousel className="relative w-full h-full">
                <CarouselContent className="h-full ">
                    {/* First slide: Cover and Intro */}
                    <CarouselItem className="h-full">
                        <Card className="relative h-full p-6 overflow-y-auto">
                            <div className="flex flex-col items-center justify-center min-h-full">
                                <img
                                    src="https://via.placeholder.com/800x400"
                                    alt="Album Collection Cover"
                                    className="w-full max-w-[400px] mb-4 rounded-lg shadow-lg"
                                />
                                <h1 className="mb-4 text-xl font-bold">2006–2010: Afrobeats Finds Its Rhythm </h1>
                                <p className="max-w-2xl text-center">
                                    During this era, Afrobeats matured, with artists establishing themselves as household names across Africa and beyond. The genre saw increased influence from hip-hop, R&B, and dancehall, while digital platforms began expanding its reach globally.                                </p>
                            </div>
                        </Card>
                    </CarouselItem>

                    {/* Subsequent slides for each album */}
                    {albums.map((album, index) => (
                        <CarouselItem key={index} className="h-full">
                            <Card className="relative h-full p-6 overflow-y-auto">
                                <div className="flex flex-col items-center min-h-full">
                                    <h2 className="mb-4 text-2xl font-semibold">{album.name}</h2>
                                    <img
                                        src={album.imgSrc}
                                        alt={`${album.name} Cover`}
                                        className="w-[150px] h-[150px] object-cover mb-4 rounded-lg shadow-lg"
                                    />

                                    <p className="mt-4 text-center max-w-[400px]">{album.description}</p>
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

export default Shelf3



