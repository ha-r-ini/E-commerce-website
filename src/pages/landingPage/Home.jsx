import "./home.css";
import Slider from "./components/Slider";
import Grid from "@mui/material/Grid";
import faqImg from "../../assets/faq-img.png";
import Faq from "./components/Faq";
import ProductCard from "../../components/ProductCard";
import Testimonials from "./components/Testimonials";
import useFetch from "../../hooks/useFetch";
import CardSkeleton from "../../components/skeleton/CardSkeleton";
import useTitle from "../../hooks/useTitle";

const testimonials = [
  {
    title: "Sarah Williams",
    feedback:
      "I absolutely love the quality of these ceramics. The finish is beautiful, and every piece feels thoughtfully handcrafted.",
  },
  {
    title: "Sophia Anderson",
    feedback:
      "The pieces look even better in person. The simple, elegant design fits perfectly with my home decor.",
  },
  {
    title: "Olivia Bennett",
    feedback:
      "The ceramic set is beautifully made and feels very durable. You can really see the care and attention to detail.",
  },
  {
    title: "Emma Williams",
    feedback:
      "From the beautiful packaging to the quality of the products, everything was wonderful. I will definitely be ordering again.",
  },
];
const faqs = [
  {
    question: "Are your ceramic products handmade?",
    answer:
      "Yes, our ceramics are thoughtfully crafted with care and attention to detail. Each piece has its own unique character and finish.",
  },
  {
    question: "Are your ceramics dishwasher and microwave safe?",
    answer:
      "Most of our everyday ceramic pieces are dishwasher and microwave safe. Please check the product details for specific care instructions.",
  },
  {
    question: "How should I care for my ceramic products?",
    answer:
      "We recommend gentle washing with mild soap and avoiding sudden temperature changes to keep your ceramics looking beautiful for longer.",
  },
  {
    question: "Do you offer returns or exchanges?",
    answer:
      "Yes, we accept returns and exchanges for eligible products. Items must be unused and returned in their original condition and packaging.",
  },
  {
    question: "Do you offer gift packaging?",
    answer:
      "Yes, selected ceramic products can be beautifully packaged for gifting. Gift options are available during checkout where applicable.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually processed within a few business days, with delivery times depending on your location. You will receive tracking details once your order is shipped.",
  },
];
const Home = () => {

  useTitle('Terra')
  const host = import.meta.env.VITE_HOST
  const {product, error, loading} = useFetch(`${host}/444/featured_products`)

  return (
    <>
      <section className="banner">
        <div className="container-width">
          <Slider />
        </div>
      </section>
      <section className="section-1">
        <div className="container-width">
          <div className="sec-title">
            <h2>Featured Products</h2>
            <p className="mt-20">
              Discover our carefully curated collection of handcrafted ceramics,
              where timeless design meets thoughtful craftsmanship. Each piece
              is made to bring beauty and warmth into your everyday life.
            </p>
          </div>

          {loading && <CardSkeleton/>}

          {error && <p>Error: {error.message}</p>}

          {!loading && !error && (
            <ProductCard products={product} />
          )}

        </div>
      </section>

      <section className="section-2">
        <div className="container-width">
          <div className="sec-title">
            <h2>Testimonials</h2>
            <p className="mt-20">
              From everyday essentials to beautiful statement pieces, our
              ceramics are made to be loved and lived with. See what our
              customers have to say about their experience with our collection.
            </p>
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      <section className="section-3">
        <div className="container-width">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <div className="sec-title">
                <h2>Frequently asked questions</h2>
                <p className="mt-20">
                  From everyday essentials to beautiful statement pieces, our
                  ceramics are made to be loved and lived with. See what our
                  customers have to say about their experience with our
                  collection.
                </p>
              </div>
              <div className="sec3-img">
                <img src={faqImg} width="100%" alt="faq" />
              </div>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}
              className="faq"
            >
              <Faq faqs={faqs} />
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default Home;
