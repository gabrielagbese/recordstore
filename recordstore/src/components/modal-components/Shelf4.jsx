import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf4() {
    const albums = [
        {
            name: 'Wizkid - Superstar (2011)',
            imgSrc: "/11-15/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Marking Wizkid’s debut, this album featured hits like Holla at Your Boy and Pakurumo, showcasing a blend of youthful exuberance and polished Afrobeats production. It solidified Wizkid’s role as a key figure in the genre’s global ascent.'
        },
        {
            name: 'Davido - Omo Baba Olowo (OBO) (2012)',
            imgSrc: "/11-15/image2.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With dance-floor anthems like Dami Duro and Ekuro, Davido’s debut album introduced high-energy Afrobeats infused with pop. It established him as a force in shaping the genre’s commercial sound.'
        },
        {
            name: 'Burna Boy - L.I.F.E (Leaving an Impact for Eternity) (2013)',
            imgSrc: "/11-15/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "This album fused reggae, Afrobeat, and dancehall, featuring hits like Like to Party. It introduced Burna Boy’s unique sound and deepened Afrobeats’ artistic complexity.'"
        },
        {
            name: 'Tiwa Savage - Once Upon a Time (2013)',
            imgSrc: "/11-15/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'A breakthrough for women in Afrobeats, this album balanced catchy pop tracks like Kele Kele Love with socially conscious themes, cementing Tiwa Savage’s legacy as a leading lady of the genre.'
        },
        {
            name: 'PSquare - The Invasion (2011)',
            imgSrc: "/11-15/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Featuring tracks like Chop My Money and Beautiful Onyinye, this album epitomized Afrobeats’ fusion with R&B and electronic sounds. Their seamless collaborations with Akon and Rick Ross expanded the genre’s global appeal.'
        },
        {
            name: 'Ice Prince - Everybody Loves Ice Prince (2011)',
            imgSrc: "/11-15/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'With hits like Oleku, Ice Prince’s debut blended rap and melodic Afrobeats, setting a standard for Nigerian hip-hop’s integration into mainstream Afrobeats.'
        },
        {
            name: 'Flavour - Blessed (2012)',
            imgSrc: "/11-15/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'This album refined highlife with tracks like Ada Ada, showcasing Flavour’s ability to blend tradition with modern Afrobeats sounds.'
        },
        {
            name: 'Olamide - YBNL (2012)',
            imgSrc: "/11-15/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Olamide’s street anthems like First of All made Yoruba rap central to Afrobeats, while his raw and relatable lyrics connected with Nigeria’s youth. '
        },
        {
            name: 'Phyno - No Guts No Glory (2014)',
            imgSrc: "/11-15/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: ' Phyno’s debut introduced Igbo rap to the mainstream, with tracks like Man of the Year showcasing his linguistic dexterity and regional pride.'
        },
        {
            name: 'Iyanya - Desire (2013)',
            imgSrc: "/11-15/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Featuring the viral hit Kukere, this album capitalized on dance culture, with its Etighi-inspired sound dominating clubs across Africa and beyond.'
        },
        {
            name: 'Yemi Alade - King of Queens (2014)',
            imgSrc: "/11-15/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Johnny became a continental anthem, emphasizing Yemi Alade’s ability to craft catchy narratives with a pan-African appeal.'
        },
        {
            name: 'Wizkid - Ayo (2014)',
            imgSrc: "/11-15/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'Ayo was a defining album in Wizkid’s career, following the massive success of his debut Superstar. The album blends Afrobeats with international sounds, including dancehall, R&B, and pop influences, and features hits like Caro and On Top Your Matter. .'
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
                                <h1 className="mb-4 text-xl font-bold">2011–2015: Afrobeats Goes Global </h1>
                                <p className="max-w-2xl text-center">
                                    This era saw Afrobeats take significant steps onto the international stage, with global collaborations, refined production, and widespread digital distribution propelling the genre's recognition.
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

export default Shelf4



