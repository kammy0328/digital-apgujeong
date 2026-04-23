import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function WeddingReviews() {
  const reviews = [
    {
      id: 1,
      name: "김*영 신부님",
      date: "2026.03.15",
      title: "본식 영상 피부 보정 대만족입니다!",
      content: "결혼식 당일에 갑자기 트러블이 올라와서 영상 볼 때마다 속상했는데, 정말 감쪽같이 지워주셨어요. 영상인데도 사진처럼 깔끔하게 보정되는 게 너무 신기해요. 자연스럽게 예뻐져서 평생 소장할 수 있을 것 같아요.",
      rating: 5
    },
    {
      id: 2,
      name: "이*진 신부님",
      date: "2026.02.28",
      title: "어두운 홀이었는데 화사하게 살려주셨어요",
      content: "식장이 많이 어두운 편이라 원본 영상이 칙칙해 보였는데, 톤 보정을 거치니까 피부가 맑고 투명해 보여요. 팔뚝 라인도 과하지 않게 살짝 다듬어주셔서 드레스 핏이 훨씬 예뻐 보입니다. 감사합니다!",
      rating: 5
    },
    {
      id: 3,
      name: "박*수 신랑님",
      date: "2026.01.20",
      title: "아내가 너무 좋아합니다",
      content: "아내가 본식 영상 받고 조금 아쉬워하길래 몰래 의뢰했는데 결과물 보고 정말 좋아하네요. 인위적이지 않고 원래 피부가 좋은 것처럼 자연스럽게 작업해주셔서 만족스럽습니다. 주변 예비 부부들에게도 추천할게요.",
      rating: 5
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 break-keep">웨딩 후기</h1>
          <p className="text-neutral-400 tracking-[0.2em] text-sm">WEDDING REVIEWS</p>
        </div>

        <div className="space-y-8">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="border border-neutral-200 p-8 hover:border-neutral-400 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 break-keep">{review.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-neutral-500">
                    <span>{review.name}</span>
                    <span>|</span>
                    <span>{review.date}</span>
                  </div>
                </div>
                <div className="flex text-neutral-800">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-neutral-600 font-light leading-relaxed break-keep">
                {review.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
