import {
  Page,
  Layout,
  Card,
  Text,
} from "@shopify/polaris";

export default function AdditionalPage() {
  return (
    <Page title="Additional page">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">Additional page content</Text>
            <Text as="p">This page is a placeholder for future features.</Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
