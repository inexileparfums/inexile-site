'use client'
import DecryptedText from './DecryptedText'

const lines = [
  { text: 'IN EXILE was born from the belief that identity is forged through creation.', size: 'body' },
  { text: 'Fragrance is armor, expression, and self-definition —', size: 'body' },
  { text: 'carried without explanation.', size: 'body', indent: true },
  { text: '', size: 'spacer' },
  { text: 'IN EXILE exists in the space between loss and creation.', size: 'body' },
  { text: 'It was shaped by independence, instinct, and the refusal to accept what was given.', size: 'body' },
  { text: 'When the expected path disappears,', size: 'body' },
  { text: 'creation becomes the only way forward.', size: 'body', indent: true },
  { text: '', size: 'spacer' },
  { text: 'To exist in exile is not to be removed, but to stand apart.', size: 'body' },
  { text: 'To observe. To rebuild. To define yourself without permission.', size: 'body' },
  { text: '', size: 'spacer' },
  { text: 'Creation is an act of faith.', size: 'body' },
  { text: 'It is the quiet decision to continue,', size: 'body' },
  { text: 'guided by nothing but conviction.', size: 'body' },
  { text: 'Not for approval. Not for recognition.', size: 'body' },
  { text: 'But because it is necessary.', size: 'body', indent: true },
  { text: '', size: 'spacer' },
  { text: 'FRAGRANCE IS PRESENCE MADE INVISIBLE.', size: 'hero' },
  { text: '', size: 'spacer' },
  { text: 'It carries memory, intention, and identity into the world.', size: 'body' },
  { text: 'It becomes part of you, and remains long after you have gone.', size: 'body' },
  { text: '', size: 'spacer' },
  { text: 'Every composition from IN EXILE is created with purpose.', size: 'body' },
  { text: 'Nothing is accidental. Nothing is rushed.', size: 'body' },
  { text: 'Each fragrance is an artifact of endurance —', size: 'body' },
  { text: 'a reflection of resilience and self-definition.', size: 'body', indent: true },
  { text: '', size: 'spacer' },
  { text: 'IN EXILE is not about perfection. It is about truth.', size: 'body' },
  { text: '', size: 'spacer' },
  { text: 'It is for those who create their own meaning.', size: 'body' },
  { text: 'It is for those who remain.', size: 'body' },
]

export default function ManifestoSection() {
  return (
    <section className="relative z-10" style={{ padding: '40vh 0 20vh' }}>
      <div style={{ maxWidth: '660px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)' }}>
        {lines.map((line, i) => {
          if (line.size === 'spacer') {
            return <div key={i} style={{ height: 'clamp(32px, 5vh, 56px)' }} />
          }

          if (line.size === 'hero') {
            return (
              <div key={i} style={{ fontSize: 'clamp(18px, 3.2vw, 30px)', letterSpacing: '0.14em', lineHeight: 1.3, fontWeight: 500, color: '#E8E6E3', margin: 'clamp(24px, 4vh, 48px) 0', textTransform: 'uppercase' }}>
                <DecryptedText
                  text={line.text}
                  animateOn="view"
                  sequential={true}
                  speed={84}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%-."
                  className="text-brand-text"
                  encryptedClassName="text-brand-dim"
                />
              </div>
            )
          }

          return (
            <div key={i} style={{ fontSize: 'clamp(13px, 1.5vw, 16px)', letterSpacing: '0.04em', lineHeight: 1.85, fontWeight: 300, paddingLeft: line.indent ? 'clamp(16px, 3vw, 32px)' : 0, marginBottom: '0.15em' }}>
              <DecryptedText
                text={line.text}
                animateOn="view"
                sequential={true}
                speed={28}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-"
                className={line.indent ? 'text-[#9A9895]' : 'text-[#C4C2BF]'}
                encryptedClassName="text-[#3A3836]"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
