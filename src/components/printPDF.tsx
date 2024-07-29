import {View, Text, Document, Page} from "@react-pdf/renderer";

const PrintPDF = ({
  report_data,
  Header,
  PageContent,
}: {
  report_data: any;
  Header: any;
  PageContent: any;
}) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    header: {
      width: "100%",
      marginBottom: 3,
    },
    headerContent: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    headerImage: {
      width: 50,
      height: 50,
      marginBottom: 5,
    },
    headerText: {
      textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
    },
    title: {
      // flexDirection: "row",
      marginBottom: 0,
      fontSize: 9,
    },
    table: {
      width: "100%",
      marginTop: 20,
      border: "1px solid #ccc",
    },
    headerRow: {
      flexDirection: "row",
      marginBottom: 10,
      width: "100%",
      backgroundColor: "gray",
    },
    row: {
      flexDirection: "row",
      marginBottom: 3,
      width: "100%",
    },
    cell: {
      flex: 1,
      width: "33%",
      textAlign: "center",
      fontSize: 12,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      bottom: 20,
      left: 10,
      right: 10,
      fontSize: 10,
      textAlign: "center",
    },
    footerText: {
      color: "gray",
    },
  });
  const Footer = ({pageNumber, totalPages}: {pageNumber: number; totalPages: number}) => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Report Generated on {new Date().toLocaleString()}</Text>
      <Text style={styles.footerText}>
        Page {pageNumber} of {totalPages}
      </Text>
    </View>
  );

  const UserTablePDF = () => {
    // Sample data for 10 users

    const totalPages = Math.ceil(report_data.length / 20);

    // Split the data into pages
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * 20;
      const endIndex = startIndex + 20;
      const pageData = report_data.slice(startIndex, endIndex);
      pages.push(pageData);
    }

    return (
      <Document>
        {pages.map((pageData, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <Header />
            <PageContent></PageContent>
            <>
              <View style={styles.title}>
                <Text>Title: Branch Library Report</Text>
                <Text>Print Date: {new Date().toLocaleString()}</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.headerRow}>
                  <Text style={styles.cell}>SL</Text>
                  <Text style={styles.cell}>Item Type</Text>
                  <Text style={styles.cell}>Total Biblios</Text>
                  <Text style={styles.cell}>Total Items</Text>
                </View>
                {pageData.map((element, index) => (
                  <UserRow key={index} Item={element} />
                ))}
              </View>
              <Footer pageNumber={pageIndex + 1} totalPages={totalPages} />
            </>
          </Page>
        ))}
      </Document>
    );
  };
};

export default PrintPDF;
