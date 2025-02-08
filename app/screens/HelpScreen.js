import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';
import SPACING from '../config/SPACING';

const HelpScreen = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const faqs = [
    {
      id: 1,
      question: '¿Cómo puedo realizar un pedido?',
      answer:
        'Para realizar un pedido, selecciona tu café preferido, elige el tamaño y extras deseados, y pulsa "Comprar Ahora". Sigue las instrucciones para completar el pago y la entrega.',
    },
    {
      id: 2,
      question: '¿Cuáles son los métodos de pago aceptados?',
      answer:
        'Aceptamos tarjetas de crédito/débito, PayPal, y pago en efectivo al momento de la entrega.',
    },
    {
      id: 3,
      question: '¿Cuál es el tiempo estimado de entrega?',
      answer:
        'El tiempo promedio de entrega es de 20-30 minutos, dependiendo de tu ubicación y la hora del día.',
    },
    {
      id: 4,
      question: '¿Cómo puedo cancelar mi pedido?',
      answer:
        'Puedes cancelar tu pedido dentro de los primeros 5 minutos después de realizarlo desde la sección "Historial de Pedidos".',
    },
  ];

  const helpSections = [
    {
      id: 'contact',
      title: 'Contacto Directo',
      icon: 'call-outline',
      items: [
        {
          id: 'call',
          title: 'Llamar a Soporte',
          icon: 'call',
          action: () => Linking.openURL('tel:+123456789'),
        },
        {
          id: 'email',
          title: 'Enviar Email',
          icon: 'mail',
          action: () => Linking.openURL('mailto:support@coffeeapp.com'),
        },
        {
          id: 'chat',
          title: 'Chat en Vivo',
          icon: 'chatbubble-ellipses',
          action: () => console.log('Abrir chat'),
        },
      ],
    },
    {
      id: 'resources',
      title: 'Recursos',
      icon: 'book-outline',
      items: [
        {
          id: 'guide',
          title: 'Guía de Uso',
          icon: 'reader',
          action: () => console.log('Abrir guía'),
        },
        {
          id: 'terms',
          title: 'Términos y Condiciones',
          icon: 'document-text',
          action: () => console.log('Abrir términos'),
        },
        {
          id: 'privacy',
          title: 'Política de Privacidad',
          icon: 'shield-checkmark',
          action: () => console.log('Abrir política'),
        },
      ],
    },
  ];

  const renderFAQItem = item => (
    <TouchableOpacity
      key={`faq-${item.id}`}
      style={styles.faqItem}
      onPress={() =>
        setExpandedSection(expandedSection === item.id ? null : item.id)
      }
    >
      <BlurView intensity={30} tint="dark" style={styles.faqContent}>
        <View style={styles.faqHeader}>
          <Text style={styles.faqQuestion}>{item.question}</Text>
          <Ionicons
            name={expandedSection === item.id ? 'chevron-up' : 'chevron-down'}
            size={SPACING * 2}
            color={colors.primary}
          />
        </View>
        {expandedSection === item.id && (
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        )}
      </BlurView>
    </TouchableOpacity>
  );

  const renderHelpSectionItem = (item, sectionId) => (
    <TouchableOpacity
      key={`${sectionId}-${item.id}`}
      style={styles.sectionItem}
      onPress={item.action}
    >
      <Ionicons name={item.icon} size={SPACING * 2} color={colors.white} />
      <Text style={styles.itemText}>{item.title}</Text>
      <Ionicons
        name="chevron-forward"
        size={SPACING * 2}
        color={colors.secondary}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={SPACING * 2} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Help Sections */}
        {helpSections.map(section => (
          <View key={`section-${section.id}`} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons
                name={section.icon}
                size={SPACING * 2}
                color={colors.primary}
              />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <BlurView intensity={30} tint="dark" style={styles.sectionContent}>
              {section.items.map(item =>
                renderHelpSectionItem(item, section.id)
              )}
            </BlurView>
          </View>
        ))}

        {/* FAQs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons
              name="help-circle-outline"
              size={SPACING * 2}
              color={colors.primary}
            />
            <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          </View>
          {faqs.map(renderFAQItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING * 2,
    borderBottomWidth: 1,
    borderBottomColor: colors['dark-light'],
  },
  headerTitle: {
    color: colors.white,
    fontSize: SPACING * 2,
    fontWeight: '600',
    marginLeft: SPACING * 2,
  },
  content: {
    flex: 1,
    padding: SPACING,
  },
  section: {
    marginBottom: SPACING * 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: SPACING * 1.8,
    fontWeight: '600',
    marginLeft: SPACING,
  },
  sectionContent: {
    borderRadius: SPACING * 2,
    overflow: 'hidden',
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: colors['dark-light'],
  },
  itemText: {
    flex: 1,
    color: colors.white,
    fontSize: SPACING * 1.4,
    marginLeft: SPACING * 1.5,
  },
  faqItem: {
    marginBottom: SPACING,
    borderRadius: SPACING * 2,
    overflow: 'hidden',
  },
  faqContent: {
    padding: SPACING * 1.5,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    color: colors.white,
    fontSize: SPACING * 1.4,
    fontWeight: '500',
  },
  faqAnswer: {
    color: colors.secondary,
    fontSize: SPACING * 1.3,
    marginTop: SPACING,
    lineHeight: SPACING * 2,
  },
});

export default HelpScreen;
