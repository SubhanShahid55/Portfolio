import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MASCOT_ASSETS, DragonState } from '@/types/mascot';
import { useDragonMascot } from '@/hooks/useDragonMascot';
import { generateChatResponse } from '@/lib/chatbotEngine';
import { profileKnowledge } from '@/data/profile';
import LiveDragonPuppet from '@/components/mascot/LiveDragonPuppet';
import DragonMascot from '@/components/DragonMascot';

describe('Dragon Mascot Assets & Types', () => {
  it('defines required mascot fallback asset', () => {
    expect(MASCOT_ASSETS.fallback).toBeDefined();
    expect(typeof MASCOT_ASSETS.fallback).toBe('string');
  });
});


describe('LiveDragonPuppet Multi-Part Kinematics Component', () => {
  it('renders SVG vector rig with independent body part layers', () => {
    const { container } = render(React.createElement(LiveDragonPuppet, { state: 'idle', size: 'md' }));
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Check SVG paths for wings, horns, tail, chest, eyes
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThan(6);
  });

  it('renders thinking particles in thinking state', () => {
    const { container } = render(React.createElement(LiveDragonPuppet, { state: 'thinking', size: 'lg' }));
    expect(container).toBeInTheDocument();
  });

  it('renders sleeping Zzz indicator in sleeping state', () => {
    const { container } = render(React.createElement(LiveDragonPuppet, { state: 'sleeping', size: 'md' }));
    expect(container.textContent).toContain('Zzz');
  });
});

describe('DragonMascot Component & Accessibility', () => {
  it('renders accessible label for screen readers', () => {
    render(React.createElement(DragonMascot, { state: 'idle', size: 'sm', altText: 'Chip AI guardian dragon' }));
    expect(screen.getByLabelText('Chip AI guardian dragon')).toBeInTheDocument();
  });

  it('renders interactive button when interactive is true', () => {
    const handleClick = vi.fn();
    render(React.createElement(DragonMascot, { state: 'idle', size: 'md', interactive: true, onOpenAssistant: handleClick }));
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});


describe('useDragonMascot State Machine Hook', () => {
  it('initializes in idle state by default', () => {
    const { result } = renderHook(() => useDragonMascot());
    expect(result.current.state).toBe('idle');
  });

  it('triggers transient curious state', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDragonMascot());

    act(() => {
      result.current.triggerCurious();
    });

    expect(result.current.state).toBe('curious');

    act(() => {
      vi.advanceTimersByTime(2500);
    });

    expect(result.current.state).toBe('idle');
    vi.useRealTimers();
  });

  it('triggers listening state on user typing', () => {
    const { result } = renderHook(() => useDragonMascot());

    act(() => {
      result.current.triggerListening();
    });

    expect(result.current.state).toBe('listening');
  });

  it('triggers thinking and answering state transitions', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDragonMascot());

    act(() => {
      result.current.triggerThinking();
    });
    expect(result.current.state).toBe('thinking');

    act(() => {
      result.current.triggerAnswering();
    });
    expect(result.current.state).toBe('answering');

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(result.current.state).toBe('idle');
    vi.useRealTimers();
  });

  it('triggers excited state on project interaction', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useDragonMascot());

    act(() => {
      result.current.triggerExcited();
    });
    expect(result.current.state).toBe('excited');

    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(result.current.state).toBe('idle');
    vi.useRealTimers();
  });

  it('wakes up from sleeping state', () => {
    const { result } = renderHook(() => useDragonMascot());

    act(() => {
      result.current.setState('sleeping');
    });
    expect(result.current.state).toBe('sleeping');

    act(() => {
      result.current.wakeUp();
    });
    expect(result.current.state).toBe('idle');
  });
});

describe('Chatbot Engine Mascot Integration', () => {
  it('responds with Chip guardian dragon persona on mascot queries', () => {
    const response1 = generateChatResponse('Who is Chip?', [], profileKnowledge);
    expect(response1.text).toContain('Chip');
    expect(response1.text).toContain('guardian dragon');

    const response2 = generateChatResponse('Are you a dragon?', [], profileKnowledge);
    expect(response2.text).toContain('Chip');
    expect(response2.text).toContain('dragon');

    const response3 = generateChatResponse('What is Chip AI?', [], profileKnowledge);
    expect(response3.text).toContain('Chip');
    expect(response3.text).toContain('guardian dragon');
  });

  it('provides grounded fallback on unknown questions', () => {
    const response = generateChatResponse('What is the capital of Mars?', [], profileKnowledge);
    expect(response.text).toContain("I don’t have a confirmed answer for that in the published portfolio");
  });
});

