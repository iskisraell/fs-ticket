import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import { Ticket } from '../types';
import {
    MapPinIcon, CalendarIcon, HashIcon, InfoIcon, FileTextIcon,
    CheckCircle2Icon, CameraIcon, ImagePlusIcon, Building2Icon,
    LayoutIcon, CheckIcon
} from './PDFIcons';

// Register Rethink Sans font from design system
Font.register({
    family: 'Rethink Sans',
    fonts: [
        { src: '/assets/RethinkSans-Medium.ttf' },
        { src: '/assets/RethinkSans-Bold.ttf', fontWeight: 'bold' }
    ]
});

const colors = {
    orange: '#FF4F00',
    black: '#000000',
    cream: '#F9F2E7',
    purple: '#4E18FF',
    yellow: '#FECC14',
    green: '#3D7700',
    gray: '#F3F4F6',
    darkGray: '#374151',
    lightGray: '#E5E7EB',
    white: '#FFFFFF',
};

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Rethink Sans',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: colors.orange,
        paddingBottom: 10,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 80,
        height: 'auto',
        marginRight: 15,
    },
    headerTitleBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    headerSubtitle: {
        fontSize: 10,
        color: colors.orange,
        marginTop: 2,
        fontWeight: 'normal',
    },
    headerRight: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    ticketIdBadge: {
        backgroundColor: colors.cream,
        padding: '4 8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.orange,
    },
    ticketIdText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.black,
    },
    dateText: {
        fontSize: 10,
        color: '#6B7280', // gray-500
        marginTop: 5,
    },
    section: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        gap: 15,
    },
    col: {
        flex: 1,
    },
    card: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.darkGray,
        overflow: 'hidden',
    },
    imageCard: {
        height: 200,
        position: 'relative',
        backgroundColor: '#111827', // gray-900
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        opacity: 0.9,
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    imageTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    badge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: colors.orange,
        padding: '4 8',
        borderRadius: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    mapCard: {
        height: 200,
        backgroundColor: colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 0.8,
    },
    mapPlaceholderText: {
        color: '#9CA3AF',
        fontSize: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.lightGray,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    mapIconBox: {
        backgroundColor: 'rgba(255, 79, 0, 0.1)',
        padding: 4,
        borderRadius: 4,
    },
    mapInfo: {
        flex: 1,
    },
    mapLabel: {
        fontSize: 8,
        color: '#9CA3AF',
        fontWeight: 'normal',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    mapAddress: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
    },
    mapSubAddress: {
        fontSize: 8,
        color: '#6B7280',
    },
    detailsCard: {
        backgroundColor: colors.cream,
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    detailItem: {
        width: '23%', // approx 1/4
        marginBottom: 5,
    },
    detailLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 2,
    },
    detailLabel: {
        fontSize: 8,
        color: colors.orange,
        fontWeight: 'normal',
        textTransform: 'uppercase',
    },
    detailValue: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#111827',
    },
    statusBadge: {
        backgroundColor: colors.green,
        padding: '2 6',
        borderRadius: 4,
        alignSelf: 'flex-start',
    },
    statusText: {
        color: 'white',
        fontSize: 8,
        fontWeight: 'bold',
    },
    checklistSection: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: colors.darkGray,
        borderRadius: 12,
        overflow: 'hidden',
    },
    checklistHeader: {
        backgroundColor: colors.black,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    checklistTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    checklistTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    checklistStats: {
        color: 'white',
        fontSize: 10,
    },
    groupHeader: {
        backgroundColor: colors.cream,
        padding: '6 10',
        borderBottomWidth: 1,
        borderBottomColor: colors.orange,
    },
    groupTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.black,
        textTransform: 'uppercase',
    },
    checklistItem: {
        padding: '8 10',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 12,
        height: 12,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        marginRight: 8,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    checkedBox: {
        backgroundColor: colors.orange,
        borderColor: colors.orange,
    },
    itemContent: {
        flex: 1,
    },
    itemLabel: {
        fontSize: 10,
        color: '#4B5563',
    },
    itemLabelChecked: {
        color: colors.black,
        fontWeight: 'bold',
    },
    photoPlaceholderGrid: {
        flexDirection: 'row',
        marginTop: 5,
        gap: 10,
    },
    photoPlaceholder: {
        width: 100,
        height: 60,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        position: 'relative',
    },
    photoPlaceholderBadge: {
        position: 'absolute',
        top: -5,
        left: 5,
        backgroundColor: 'white',
        padding: '0 2',
    },
    photoPlaceholderText: {
        fontSize: 6,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    photoPlaceholderContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gallerySection: {
        marginTop: 20,
    },
    galleryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: colors.orange,
        paddingBottom: 5,
    },
    galleryHeaderIcon: {
        backgroundColor: colors.orange,
        padding: 4,
        borderRadius: 4,
    },
    galleryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
    galleryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    galleryItem: {
        width: '30%',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colors.lightGray,
        borderRadius: 8,
        overflow: 'hidden',
    },
    galleryImage: {
        width: '100%',
        height: 100,
        objectFit: 'contain',
    },
    galleryCaption: {
        padding: 5,
        backgroundColor: 'white',
    },
    galleryLabel: {
        fontSize: 8,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    footer: {
        marginTop: 30,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        paddingTop: 10,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 8,
        color: '#9CA3AF',
    },
});

interface Props {
    ticket: Ticket;
    showCorrection: boolean;
    logo: string;
}

export const PDFDocument: React.FC<Props> = ({ ticket, showCorrection, logo }) => {
    const totalOccurrences = ticket.checklist.flatMap(g => g.items).filter(i => i.value).length;

    // Static Map URL (Yandex Maps as a reliable fallback for static images without key)
    // Using a generic marker style
    const mapUrl = ticket.location.lat && ticket.location.lng
        ? `https://static-maps.yandex.ru/1.x/?lang=pt_BR&ll=${ticket.location.lng},${ticket.location.lat}&z=17&l=map&size=450,300&pt=${ticket.location.lng},${ticket.location.lat},pm2rdm`
        : null;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Image src={logo} style={styles.logo} />
                        <View style={styles.headerTitleBlock}>
                            <Text style={styles.headerTitle}>Relatório de Vistoria</Text>
                            <Text style={styles.headerSubtitle}>Eletromidia Field Service</Text>
                        </View>
                    </View>
                    <View style={styles.headerRight}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <View style={[styles.ticketIdBadge, { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' }]}>
                                <Text style={[styles.ticketIdText, { color: '#4B5563' }]}>Nº ELT {ticket.eltNumber}</Text>
                            </View>
                            <View style={styles.ticketIdBadge}>
                                <Text style={styles.ticketIdText}>#{ticket.id}</Text>
                            </View>
                        </View>
                        <Text style={styles.dateText}>Emitido em {new Date().toLocaleDateString()}</Text>
                    </View>
                </View>

                {/* Top Section: Photo & Map */}
                <View style={[styles.row, styles.section]} wrap={false}>
                    <View style={[styles.col, styles.card, styles.imageCard]}>
                        <Image
                            src={ticket.photos.before[0]?.url || 'https://placehold.co/600x400?text=Sem+Foto'}
                            style={styles.mainImage}
                        />
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>FOTO INICIAL</Text>
                        </View>
                        <View style={styles.imageOverlay}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                <LayoutIcon size={16} color={colors.yellow} />
                                <Text style={styles.imageTitle}>{ticket.equipment.model}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.col, styles.card, styles.mapCard]}>
                        {mapUrl ? (
                            <Image src={mapUrl} style={styles.mapImage} />
                        ) : (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <MapPinIcon size={24} color="#9CA3AF" />
                                <Text style={[styles.mapPlaceholderText, { marginTop: 5 }]}>Mapa não disponível</Text>
                            </View>
                        )}

                        <View style={styles.mapOverlay}>
                            <View style={styles.mapIconBox}>
                                <MapPinIcon size={14} color={colors.orange} />
                            </View>
                            <View style={styles.mapInfo}>
                                <Text style={styles.mapLabel}>LOCALIZAÇÃO</Text>
                                <Text style={styles.mapAddress}>{ticket.location.address}</Text>
                                <Text style={styles.mapSubAddress}>{ticket.location.district} • {ticket.location.cep}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Details */}
                <View style={[styles.detailsCard, styles.section]} wrap={false}>
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabelRow}>
                            <HashIcon size={10} color={colors.orange} />
                            <Text style={styles.detailLabel}>CÓD. ELETRO</Text>
                        </View>
                        <Text style={styles.detailValue}>{ticket.equipment.id}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabelRow}>
                            <HashIcon size={10} color={colors.orange} />
                            <Text style={styles.detailLabel}>CÓD. SPTRANS</Text>
                        </View>
                        <Text style={styles.detailValue}>{ticket.equipment.stopNumber}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabelRow}>
                            <CalendarIcon size={10} color={colors.orange} />
                            <Text style={styles.detailLabel}>DATA ABERTURA</Text>
                        </View>
                        <Text style={styles.detailValue}>{ticket.openDate}</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <View style={styles.detailLabelRow}>
                            <InfoIcon size={10} color={colors.orange} />
                            <Text style={styles.detailLabel}>STATUS</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{ticket.status}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', marginTop: 5, paddingTop: 5, borderTopWidth: 1, borderTopColor: '#FFEDD5' }}>
                        <View style={styles.detailLabelRow}>
                            <FileTextIcon size={12} color={colors.purple} />
                            <Text style={[styles.detailLabel, { color: colors.purple }]}>TIPO DE ATIVIDADE</Text>
                        </View>
                        <Text style={styles.detailValue}>{ticket.activityType}</Text>
                    </View>
                </View>

                {/* Checklist */}
                {/* Checklist */}
                <View style={styles.checklistSection}>
                    <View style={styles.checklistHeader}>
                        <View style={styles.checklistTitleRow}>
                            <CheckCircle2Icon size={18} color={colors.orange} />
                            <Text style={styles.checklistTitle}>Checklist</Text>
                        </View>
                        <Text style={styles.checklistStats}>{totalOccurrences} Ocorrências</Text>
                    </View>

                    {ticket.checklist.map((group, groupIndex) => {
                        const activeItems = group.items.filter(item => item.value);
                        if (activeItems.length === 0) return null;

                        return (
                            <View key={group.title}>
                                <View style={[
                                    styles.groupHeader,
                                    // Remove bottom border if it's the last group and has no items (unlikely due to filter)
                                    // or if we want to avoid double borders.
                                    // Actually, we just need to ensure it doesn't overlap the container border.
                                ]}>
                                    <Text style={styles.groupTitle}>{group.title}</Text>
                                </View>
                                {
                                    activeItems.map((item, itemIndex) => {
                                        const isLastItem = groupIndex === ticket.checklist.length - 1 && itemIndex === activeItems.length - 1;
                                        // We need to know if this is the absolute last item of the entire visible list to remove the border
                                        // But that's hard to calculate in this map.
                                        // Instead, let's just remove the border for the last item in each group if it's the last group?
                                        // Or better: The container has a border. The items have borders.
                                        // If the last item has a border, it clashes with the container bottom border.

                                        return (
                                            <View
                                                key={item.key}
                                                style={[
                                                    styles.checklistItem,
                                                    // Remove border bottom for the very last item rendered in the section to avoid double border with container
                                                    (groupIndex === ticket.checklist.length - 1 && itemIndex === activeItems.length - 1) && { borderBottomWidth: 0 }
                                                ]}
                                                wrap={false}
                                            >
                                                <View style={[styles.checkbox, item.value && styles.checkedBox]}>
                                                    {item.value && <CheckIcon size={8} color="white" />}
                                                </View>
                                                <View style={styles.itemContent}>
                                                    <Text style={[styles.itemLabel, item.value && styles.itemLabelChecked]}>
                                                        {item.label}
                                                    </Text>
                                                    {item.value && (
                                                        <View style={styles.photoPlaceholderGrid}>
                                                            <View style={[styles.photoPlaceholder, { borderColor: colors.orange }]}>
                                                                <View style={styles.photoPlaceholderBadge}>
                                                                    <Text style={[styles.photoPlaceholderText, { color: colors.orange }]}>Ocorrência (Antes)</Text>
                                                                </View>
                                                                <View style={styles.photoPlaceholderContent}>
                                                                    <CameraIcon size={16} color="#9CA3AF" />
                                                                </View>
                                                            </View>
                                                            {showCorrection && (
                                                                <View style={[styles.photoPlaceholder, { borderColor: colors.green }]}>
                                                                    <View style={styles.photoPlaceholderBadge}>
                                                                        <Text style={[styles.photoPlaceholderText, { color: colors.green }]}>Correção (Depois)</Text>
                                                                    </View>
                                                                    <View style={styles.photoPlaceholderContent}>
                                                                        <ImagePlusIcon size={16} color="#9CA3AF" />
                                                                    </View>
                                                                </View>
                                                            )}
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                        );
                                    })
                                }
                            </View>
                        );
                    })}
                </View>

                {/* Gallery - Before */}
                <View style={styles.gallerySection} wrap={false}>
                    <View style={styles.galleryHeader}>
                        <View style={styles.galleryHeaderIcon}>
                            <Building2Icon size={16} color="white" />
                        </View>
                        <Text style={styles.galleryTitle}>Galeria de Evidências - Situação Anterior</Text>
                    </View>

                    <View style={styles.galleryGrid}>
                        {ticket.photos.before.map((photo, idx) => (
                            <View key={idx} style={styles.galleryItem} wrap={false}>
                                <Image src={photo.url} style={styles.galleryImage} />
                                <View style={styles.galleryCaption}>
                                    <Text style={styles.galleryLabel}>{photo.label}</Text>
                                </View>
                            </View>
                        ))}
                        {ticket.photos.before.length === 0 && (
                            <Text style={{ fontSize: 10, color: '#9CA3AF', fontStyle: 'italic' }}>Nenhuma foto registrada.</Text>
                        )}
                    </View>
                </View>

                {/* Gallery - After (Correction) */}
                {showCorrection && (
                    <View style={styles.gallerySection} wrap={false}>
                        <View style={[styles.galleryHeader, { borderBottomColor: colors.green }]}>
                            <View style={[styles.galleryHeaderIcon, { backgroundColor: colors.green }]}>
                                <Building2Icon size={16} color="white" />
                            </View>
                            <Text style={styles.galleryTitle}>Galeria de Evidências - Situação Final</Text>
                        </View>

                        <View style={styles.galleryGrid}>
                            {ticket.photos.after.map((photo, idx) => (
                                <View key={idx} style={styles.galleryItem} wrap={false}>
                                    <Image src={photo.url} style={styles.galleryImage} />
                                    <View style={styles.galleryCaption}>
                                        <Text style={styles.galleryLabel}>{photo.label}</Text>
                                    </View>
                                </View>
                            ))}
                            {ticket.photos.after.length === 0 && (
                                <Text style={{ fontSize: 10, color: '#9CA3AF', fontStyle: 'italic' }}>Nenhuma foto registrada.</Text>
                            )}
                        </View>
                    </View>
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Eletromidia Field Service System • v1.0.0</Text>
                </View>
            </Page>
        </Document >
    );
};
