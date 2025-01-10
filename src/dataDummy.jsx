import cakraFIP from '../src/assets/geticket_images/event/cakra.png';
import gkmFMIPA from '../src/assets/geticket_images/event/gkm.png';
import socialHarmony from '../src/assets/geticket_images/event/social_harmony.png';
import SOJ from '../src/assets/geticket_images/event/soj.png';
import magis from '../src/assets/geticket_images/event/magis.png';
import tweakFTK from '../src/assets/geticket_images/event/tweak.png';

export const eventsData = [
    {
        id: 1,
        name: 'Social Harmony',
        description: 'Social Harmony tahun ini menghadirkan Lomba Sihir dan banyak band lokal lainnya.',
        date: '2024-11-25',
        image: socialHarmony,
        ticketPrice: 50000,
    },
    {
        id: 2,
        name: 'Gema Kreasi Matematika',
        description: 'GKM 2024 mengundang Fiersa Besari, The Rain dan band lokal lainnya',
        date: '2024-12-10',
        image: gkmFMIPA,
        ticketPrice: 50000,
    },
    {
        id: 3,
        name: 'Cakra Festival',
        description: 'Cakra kembali hadir dengan mengundang For Revenge, Nostress dan masih banyak lainnya',
        date: '2025-12-25',
        image: cakraFIP,
        ticketPrice: 50000,
    },
    {
        id: 4,
        name: 'Sound of Justice',
        description: 'SOJ 2024 tahun ini mengundang beragam band nasional yang terdiri dari rocket rockers, geisha dan masih banyak lainnya',
        date: '2025-12-27',
        image: SOJ,
        ticketPrice: 50000,
    },
    {
        id: 5,
        name: 'MAGIS',
        description: 'MAGIS 2024 tahun ini mengundang beragam band nasional yang terdiri dari rocket rockers, geisha dan masih banyak lainnya',
        date: '2025-12-30',
        image: magis,
        ticketPrice: 50000,
    },
    {
        id: 6,
        name: 'TWEAK#9',
        description: 'TWEAK 2024 tahun ini mengundang beragam band nasional yang terdiri dari rocket rockers, geisha dan masih banyak lainnya',
        date: '2025-12-31',
        image: tweakFTK,
        ticketPrice: 50000,
    },
];

export const activeTickets = [
    {
        id: 1,
        product: 'Social Harmony',
        ticketCode: 'SOHA0002',
        image: socialHarmony,
        location: 'Lapangan  Ssantiago Undiksha',
        organizer: 'BEM FHIS UNDIKSHA',
        purchaseDate: '2024-11-10',
        qty: 2,
        totalPrice: 200000,
        expirationDate: '2024-12-01',
    },
    {
        id: 2,
        product: 'Gema Kreasi Matematika',
        ticketCode: 'GKM0001',
        image: gkmFMIPA,
        location: 'Lapangan Ssantiago, Kampus Tengah, Undiksha',
        organizer: 'HMJ MATEMATIKA FMIPA UNDIKSHA',
        purchaseDate: '2024-10-15',
        qty: 1,
        totalPrice: 150000,
        expirationDate: '2024-11-20',
    },
];

export const usedTickets = [
    {
        id: 3,
        product: 'Cakra Festival',
        ticketCode: 'CAFEST0001',
        image: cakraFIP,
        location: 'Lapangan  Ssantiago Undiksha',
        organizer: 'BEM FIP UNDIKSHA',
        purchaseDate: '2024-07-01',
        qty: 3,
        totalPrice: 300000,
        usedDate: '2024-07-10',
    },
    {
        id: 4,
        product: 'Social Harmoni',
        ticketCode: 'SOHA0001',
        image: socialHarmony,
        location: 'Lapangan  Ssantiago Undiksha',
        organizer: 'BEM FHIS UNDIKSHA',
        purchaseDate: '2024-06-10',
        qty: 1,
        totalPrice: 50000,
        usedDate: '2024-06-20',
    },
];