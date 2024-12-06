import React from 'react'
import { Card } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { ChevronLeft, ChevronRight } from 'lucide-react'


function Shelf5() {
    const albums = [
        {
            name: 'Wizkid - "Sounds from the Other Side" (2017)',
            imgSrc: "/16-20/image1.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "This album marked Wizkid's first significant international crossover, featuring collaborations with Drake and creating a blueprint for global Afrobeats sound. It strategically positioned Wizkid as an artist capable of bridging African music with international pop sensibilities."
        },
        {
            name: 'Davido - "A Good Time" (2019)',
            imgSrc: "/16-20/image2.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "With dance-floor anthems like Dami Duro and Ekuro, Davido’s debut album introduced high-energy Afrobeats infused with pop. It established him as a force in shaping the genre’s commercial sound."
        },
        {
            name: 'Burna Boy - "African Giant" (2019)',
            imgSrc: "/16-20/image3.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "A critically acclaimed album that positioned Burna Boy as a pan-African musical ambassador, blending Afrobeats with reggae, dancehall, and socially conscious lyrics. The album features collaborations with international artists and tackles themes of African pride, political resistance, and cultural identity."
        },
        {
            name: 'Yemi Alade - "Woman of Steel" (2019)',
            imgSrc: "/16-20/image4.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "The album highlighted female representation in Afrobeats with diverse musical styles and pan-African themes. It challenged male dominance in the genre by presenting a powerful narrative of feminine strength and cultural pride."
        },
        {
            name: 'Mr Eazi - "Life Is Eazi, Vol. 2: Lagos to London" (2018)',
            imgSrc: "/16-20/image5.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "This album showcased the diaspora connection and alternative Afrobeats soundscapes, blending Ghanaian and Nigerian musical influences. It represented the transnational nature of contemporary African music, exploring themes of migration and cultural identity"
        },
        {
            name: 'Kiss Daniel - "No Bad Songz" (2016)',
            imgSrc: "/16-20/image6.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "The album represented the emerging alternative Afrobeats sound with innovative musical techniques and personal storytelling. It demonstrated Kiss Daniel's unique approach to genre, blending melodic pop with traditional Afrobeats rhythms."
        },
        {
            name: 'Burna Boy - "On a Spaceship" (2017)',
            imgSrc: "/16-20/image7.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "An album that preceded 'African Giant' and showcased Burna Boy's early potential for genre-blending and international crossover. The project featured tracks that demonstrated his emerging distinctive style, blending Afrobeats with reggae, dancehall, and global pop influences."
        },
        {
            name: 'Falz - "Moral Instruction" (2019)',
            imgSrc: "/16-20/image8.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: 'A socially conscious album that used satirical lyrics and sharp social commentary to critique corruption, religious hypocrisy, and social issues in Nigeria. The album blended hip-hop, Afrobeats, and spoken word to create a powerful narrative about moral decay in Nigerian society. '
        },
        {
            name: 'Simi - "Simisola" (2017)',
            imgSrc: "/16-20/image9.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Brought alternative R&B influences into mainstream Afrobeats with introspective and melodically complex tracks. The album highlighted Simi's unique vocal style and her ability to merge traditional Nigerian music with contemporary global sounds."
        },
        {
            name: 'P-Square - "Double Trouble" (2016)',
            imgSrc: "/16-20/image10.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "Represented the final collaborative album of the iconic duo, showcasing their peak musical performance and brotherly chemistry. The album served as a retrospective of their musical journey and significant contribution to Nigerian pop music."
        },
        {
            name: 'Lady Donli - "Enjoy Your Life" (2019)',
            imgSrc: "/16-20/image11.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "A pivotal Alte album that blended jazz, soul, and alternative R&B with Afrobeats, representing the genre's experimental edge. The project showcased Lady Donli's unique artistic vision and helped define the Alte movement's aesthetic of musical freedom and personal expression."
        },
        {
            name: 'Cruel Santino - "Mandy & the Jungle" (2019)',
            imgSrc: "/16-20/image12.jpg",
            spotifyEmbed: 'https://open.spotify.com/embed/album/0123456789',
            description: "is a landmark Alte album that revolutionized the Nigerian alternative music scene. The album blends alternative R&B, experimental pop, and hip-hop with deeply personal storytelling, creating a unique sonic landscape that challenged traditional Afrobeats conventions. It's considered a seminal work in the Alte movement, showcasing Santi's artistic vision and pushing the boundaries of Nigerian contemporary music."
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
                                <h1 className="mb-4 text-xl font-bold">2016–2020: Afrobeats as a Global Phenomenon </h1>
                                <p className="max-w-2xl text-center">
                                    Afrobeats became a worldwide genre, with artists dominating international charts, collaborating with global stars, and performing on prestigious stages.                                </p>
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

export default Shelf5



